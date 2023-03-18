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
  return {
    paths: [
      { params: { artist: 'paramore', song: 'crushcrushcrush'} },
      { params: { artist: 'taylor-swift', song: 'love-story'} },
      { params: { artist: 'macy-gray', song: 'i-try'} }
    ],
    fallback: false
  };
}

export async function getStaticProps({params}: any) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/songs/${params?.artist}/${params?.song}`);
  const data = await res.text()
  return { props: { data } }
}