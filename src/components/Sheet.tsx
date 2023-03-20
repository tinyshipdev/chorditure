import { Chord } from '@/utils/types';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const ROOTS = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']

interface Props {
  raw: string,
  song: {
    title: string,
    artist: string,
    lyrics: { c: Chord | null, w: string }[][]
  };
}

const Sheet: React.FC<Props> = ({ song, raw }) => {
  const router = useRouter();
  const [transpose, setTranspose] = useState(0);

  function calculateRoot(originalRoot: string | undefined) {
    let root = null;

    if (originalRoot) {
      const r = ROOTS.indexOf(originalRoot);
      root = ROOTS[(ROOTS.length + (r + transpose)) % ROOTS.length];
    }

    return root;
  }

  const lines = () => song?.lyrics?.map((line, index) => {
    return (
      <div className='flex mb-4 flex-wrap' key={`line${index}`}>
        {line?.map((l, index) => {
          return (
            <React.Fragment key={index}>
              <div>
                <div className="font-bold h-6">{calculateRoot(l?.c?.root)}{l?.c?.type}</div>
                <div>{l?.w}</div>
              </div>
              <span>&nbsp;</span>
            </React.Fragment>
          )
        })}
      </div>
    )
  })

  return (
    <div>

      <div className='py-10'>
        <small>{song?.artist}</small>
        <h1 className='font-bold text-4xl'>{song?.title}</h1>
      </div>

      <div className="flex mb-10">
        <div>
          <button className='mr-4 p-2' onClick={() => setTranspose(transpose - 1 <= -12 ? 0 : transpose - 1)}>-</button>
          <span>transpose({transpose})</span>
          <button className='ml-4 p-2' onClick={() => setTranspose(transpose + 1 >= 12 ? 0 : transpose + 1)}>+</button>
        </div>
      </div>

      <div>
        {lines()}
      </div>

      {router?.query?.source && (
        <div className="my-20 whitespace-pre-wrap">
          <hr className='mb-20' />
          {raw}
        </div>
      )}
    </div>
  )
}

export default Sheet;