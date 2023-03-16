import Editor from '@/components/Editor'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Chorditure - Editor</title>
        <meta name="description" content="Simple Chords" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className='editor-container'>
          <Editor/>
        </div>
      </main>
    </>
  )
}
