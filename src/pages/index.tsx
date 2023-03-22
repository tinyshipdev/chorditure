import Header from '@/components/Header'
import Head from 'next/head'
import Link from 'next/link'

export default function Home({ songs }: { songs: { id: number, title: string, artist: string }[] }) {
  return (
    <>
      <Head>
      <title>Chorditure</title>
        <meta name="description" content="Simple Chords" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="wrapper">
          <Header/>

          {songs?.map((song) => (
            <Link key={song.id} className='block underline' href={`/${song.artist}/${song.title}`}>{song.title} - {song.artist}</Link>
          ))}
        </div>
      </main>
    </>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${process.env.BACKEND_URL}/.netlify/functions/list-songs`);
  const data = await res.json()
  return { props: { songs: data.songs || [] } }
}