import parseSong from '@/utils/parse-song';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

interface Props {
  data: string
}

const Sheet: React.FC<Props> = ({ data }) => {
  const router = useRouter();
  const [transpose, setTranspose] = useState(0);

  const isSourceView = router?.query?.source ? true : false;

  const song = parseSong(data, transpose, isSourceView);

  const transposeButton = (
    <div className="flex mb-10">
      <div>
        <button className='mr-4 p-2' onClick={() => setTranspose(transpose - 1 <= -12 ? 0 : transpose - 1)}>-</button>
        <span>transpose({transpose})</span>
        <button className='ml-4 p-2' onClick={() => setTranspose(transpose + 1 >= 12 ? 0 : transpose + 1)}>+</button>
      </div>
    </div>
  )

  return (
    <div>

      {isSourceView ? (
        <div>
          <div>{transposeButton}</div>
          <div>[title]</div>
          <div>{song.title}</div>
          <br />
          <div>[artist]</div>
          <div>{song.artist}</div>
          <br />
          <div>[lyrics]</div>
        </div>
      ) : (
        <div>
          <div className='py-10'>
            <small>{song?.artist}</small>
            <h1 className='font-bold text-4xl'>{song?.title}</h1>
          </div>
          <div>{transposeButton}</div>
        </div>
      )}

      <div
        className='whitespace-pre-wrap'
        dangerouslySetInnerHTML={{ __html: song.lyrics }}
      ></div>
    </div>
  )
}

export default Sheet;