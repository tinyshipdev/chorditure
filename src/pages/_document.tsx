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
        <footer className="text-center py-20">
          <span className="text-slate-500">made by</span> <a href="https://adamgray.dev">@ahdumgray</a>
        </footer>
      </body>
    </Html>
  )
}
