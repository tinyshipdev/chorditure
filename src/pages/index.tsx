import Header from '@/components/Header'
import getSongList from '@/utils/get-song-list'
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
          <Header />

          <div className="py-10">
            {songs?.map((song) => (
              <Link key={Buffer.from(`${song.artist}${song.title}`).toString('base64')} className='block underline py-4' href={`/${song.artist}/${song.title}`}>{song.title} - {song.artist}</Link>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

export async function getStaticProps() {
  const songs = await getSongList();
  return { props: { songs } }
}