import Header from '@/components/Header';
import Sheet from '@/components/Sheet'
import getSong from '@/utils/get-song';
import getSongList from '@/utils/get-song-list';
import Head from 'next/head'

interface Props {
  data: string;
}

export default function Song({ data }: Props) {
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
          <Sheet data={data}/>
        </div>
      </main>
    </>
  )
}

export async function getStaticPaths() {
  const songs: any = await getSongList();

  return {
    paths: songs?.map((song: { artist: string, title: string}) => ({
      params: { artist: song.artist, song: song.title}
    })),
    fallback: false
  };
}

export async function getStaticProps({params}: any) {
  const song: string = await getSong(params?.song, params?.artist);
  return { props: { data: song } }
}