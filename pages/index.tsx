import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { Date } from '../components/Date'
import { Layout, SITE_TITLE } from '../components/Layout'
import { getSortedPostsData, PostData } from '../lib/posts'
import utilStyles from '../styles/utils.module.scss'

interface HomeStaticProps {
  allPostsData: PostData[]
}

interface HomeProps extends InferGetStaticPropsType<typeof getStaticProps> {}

export default function Home(props: HomeProps): JSX.Element {
  return (
    <Layout home>
      <Head>
        <title>{SITE_TITLE}</title>
      </Head>

      <section className={utilStyles.headingMd}>
        <p>I build tools to intended to improve lives.</p>
      </section>

      <h2 className={utilStyles.headingLg}>Blog</h2>
      <ul className={utilStyles.list}>
        {props.allPostsData.map((post) => (
          <li className={utilStyles.listItem} key={post.id}>
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
            <br />
            <small className={utilStyles.lightText}>
              <Date date={post.date} />
            </small>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<HomeStaticProps> = async () => {
  return {
    props: {
      allPostsData: await getSortedPostsData(),
    },
  }
}
