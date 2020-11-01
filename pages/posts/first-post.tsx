import Head from 'next/head'
import Link from 'next/link'
import { Layout } from '../../components/Layout'

export default function FirstPost(): JSX.Element {
  return (
    <Layout>
      <Head>
        <title>First Post</title>
      </Head>
      <h1>Hello World</h1>
      <h2>
        <Link href="/">back to home</Link>
      </h2>
    </Layout>
  )
}
