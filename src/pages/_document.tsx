import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="manifest" href="/site.webmanifest"/>
        <meta name="theme-color" content="#ffffff"/>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png"/>
      </Head>
      <body className='font-mono text-lg'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
