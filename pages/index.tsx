import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import Link from 'next/link'
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
        <p>
          I build tools to drive invoice adoption as we lay down solid
          foundations for an industry-changing payments revolution.
        </p>
        <p>
          See my <Link href="/posts/first-post">first post</Link>!
        </p>
      </section>

      <h2 className={utilStyles.headingLg}>Blog</h2>
      <ul className={utilStyles.list}>
        {props.allPostsData.map((post) => (
          <li className={utilStyles.listItem} key={post.id}>
            {post.title}
            <br />
            {post.id}
            <br />
            {post.date}
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
