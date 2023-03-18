import Head from 'next/head'
import Link from 'next/link'

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
        <div className="home-container">
          <h1>chorditure</h1>
          <Link className='song-link' href="/paramore/crushcrushcrush">crushcrushcrush - paramore</Link>
          <Link className='song-link' href="/taylor-swift/love-story">love story - taylor swift</Link>
          <Link className='song-link' href="/macy-gray/i-try">i try - macy gray</Link>
        </div>
      </main>
    </>
  )
}