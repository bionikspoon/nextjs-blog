import Head from 'next/head'
import Link from 'next/link'
import { Layout, SITE_TITLE } from '../components/Layout'
import utilStyles from '../styles/utils.module.scss'

export default function Home(): JSX.Element {
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
    </Layout>
  )
}
