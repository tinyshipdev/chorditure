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
        <div className="home-container">
          <h1>chorditure</h1>
          <a className='song-link' href="/paramore/crushcrushcrush">crushcrushcrush - paramore</a>
          <a className='song-link' href="/taylor-swift/love-story">love story - taylor swift</a>
        </div>
      </main>
    </>
  )
}