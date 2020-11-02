import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { ParsedUrlQuery } from 'querystring'
import { Date } from '../../components/Date'
import { Layout } from '../../components/Layout'
import { getAllPostIds, getPostData, PostData } from '../../lib/posts'
import utilStyles from '../../styles/utils.module.scss'

interface QueryArgs extends ParsedUrlQuery {
  id: string
}
interface PostStaticProps {
  postData: PostData
}

interface PostProps extends InferGetStaticPropsType<typeof getStaticProps> {}

export default function Post(props: PostProps): JSX.Element {
  return (
    <Layout>
      <Head>
        <title>{props.postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{props.postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date date={props.postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: props.postData.contentHtml }} />
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  return {
    paths: await getAllPostIds(),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<
  PostStaticProps,
  QueryArgs
> = async (context) => {
  if (context.params === undefined) {
    // TODO: when is this undefined?
    throw new Error(`context.params is undefined`)
  }

  return {
    props: {
      postData: await getPostData(context.params.id),
    },
  }
}
