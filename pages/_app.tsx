import { AppProps } from 'next/app'
import { ReactElement } from 'react'
import '../styles/global.scss'

export default function App(props: AppProps): ReactElement {
  const { Component } = props
  return <Component {...props.pageProps} />
}
