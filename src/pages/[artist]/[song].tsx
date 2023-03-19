import Header from '@/components/Header';
import Sheet from '@/components/Sheet'
import parseSong from '@/utils/parse-song'
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
          <Sheet song={parseSong(data)}/>
        </div>
      </main>
    </>
  )
}

export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/songs`);
  const data = await res.json()

  return {
    paths: data?.songs?.map((song: { artist: string, title: string}) => ({
      params: { artist: song.artist, song: song.title}
    })),
    fallback: false
  };
}

export async function getStaticProps({params}: any) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/.netlify/functions/get-song?artist=${params?.artist}&title=${params?.song}`);
  const data = await res.json()

  const text = data?.data?.[0]?.data;

  return { props: { data: text || '' } }
}