import Sheet from '@/components/Sheet'
import parseSong from '@/utils/parse-song'
import TEST_LYRICS from '@/utils/test-lyrics'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
      <title>Chorditure</title>
        <meta name="description" content="Simple Chords" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="container">
          <Sheet song={parseSong(TEST_LYRICS)}/>
        </div>
      </main>
    </>
  )
}
