import { Chord } from '@/utils/types';
import React, { useState } from 'react';

// const ROOTS_ARR = ['A', 'A#', 'Bb', 'B', 'C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab']

const ROOTS_ARR = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']

interface Props {
  song: {
    title: string,
    artist: string,
    lyrics: { c: Chord | null, w: string }[][]
  };
}

enum DisplayType {
  INLINE,
  ABOVE
}

const Sheet: React.FC<Props> = ({ song }) => {
  const [transpose, setTranspose] = useState(0);
  const [type, setType] = useState(DisplayType.ABOVE);

  const lines = () => {
    switch (type) {
      case DisplayType.INLINE: {
        return song?.lyrics?.map((line, index) => {
          return (
            <div className='line' key={`line${index}`}>
              {line?.map((l, index) => (
                <React.Fragment key={index}>
                  <div><span className="chord">{l?.c?.root}{l?.c?.type}</span> {l?.w}</div>
                  <span>&nbsp;</span>
                </React.Fragment>
              ))}
            </div>
          )
        })
      }
      default: {
        return song?.lyrics?.map((line, index) => {
          return (
            <div className='line' key={`line${index}`}>
              {line?.map((l, index) => {

                let root = null;

                if (l?.c?.root) {
                  const r = ROOTS_ARR.indexOf(l?.c?.root);
                  root = ROOTS_ARR[Math.abs((r + transpose) % ROOTS_ARR.length)];
                }

                return (
                  <React.Fragment key={index}>
                    <div>
                      <div className="chord">{root}{l?.c?.type}</div>
                      <div>{l?.w}</div>
                    </div>
                    <span>&nbsp;</span>
                  </React.Fragment>
                )
              })}
            </div>
          )
        })
      }
    }
  }

  return (
    <div>

      <div className='song-meta'>
        <small>{song?.artist}</small>
        <h1 className='song-title'>{song?.title}</h1>

        <select name="displayType" value={type} onChange={(e) => setType(parseInt(e.target.value))}>
          <option value={DisplayType.ABOVE}>Above</option>
          <option value={DisplayType.INLINE}>Inline</option>
        </select>

        <div>
          <button onClick={() => setTranspose(transpose - 1)}>-</button>
          <span>Transpose ({transpose})</span>
          <button onClick={() => setTranspose(transpose + 1)}>+</button>
          <button onClick={() => setTranspose(0)}>reset</button>
        </div>
      </div>

      <div>
        {lines()}
      </div>
    </div>
  )
}

export default Sheet;