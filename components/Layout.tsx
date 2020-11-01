import Head from 'next/head'
import React, { ReactElement } from 'react'
import styles from './Layout.module.scss'
import utilStyles from '../styles/utils.module.scss'
import cx from 'classnames'
import Link from 'next/link'

interface LayoutProps {
  children: React.ReactNode
  home?: boolean
}

const NAME = 'Manu Phatak'
export const SITE_TITLE = "Manu's Blog"
export function Layout(props: LayoutProps): ReactElement {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta property="og:image" content={ogContent()} />
        <meta name="og:title" content={SITE_TITLE} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        {props.home ? (
          <>
            <img
              src="/images/profile.jpg"
              className={cx(styles.headerHomeImage, utilStyles.borderCircle)}
              alt={NAME}
            />
            <h1 className={utilStyles.heading2Xl}>{NAME}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <img
                src="/images/profile.jpg"
                className={cx(styles.headerImage, utilStyles.borderCircle)}
                alt={NAME}
              />
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a className={utilStyles.colorInherit}>{NAME}</a>
              </Link>
            </h2>
          </>
        )}
      </header>

      <main>{props.children}</main>

      {!props.home && (
        <div className={styles.backToHome}>
          <Link href="/">← Back to home</Link>
        </div>
      )}
    </div>
  )
}

function ogContent() {
  const contentParams = new URLSearchParams({
    theme: 'light',
    md: '0',
    fontSize: '75px',
    images:
      'https://assets.vercel.com/image/upload/front/assets/design/nextjs-black-logo.svg',
  })

  const image = `${encodeURI(SITE_TITLE)}.png`

  return `https://og-image.now.sh/${image}?${contentParams}`
}
