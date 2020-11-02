import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { ParsedUrlQuery } from 'querystring'
import { Layout } from '../../components/Layout'
import { getAllPostIds, getPostData, PostData } from '../../lib/posts'

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
      <h1>{props.postData.title}</h1>
      <p>{props.postData.id}</p>
      <p>{props.postData.date}</p>
      <div dangerouslySetInnerHTML={{ __html: props.postData.contentHtml }} />
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
