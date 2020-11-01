import Link from 'next/link'

export default function FirstPost(): JSX.Element {
  return (
    <>
      <h1>Hello World</h1>
      <h2>
        <Link href="/">back to home</Link>
      </h2>
    </>
  )
}
