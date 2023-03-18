import { Chord } from '@/utils/types';
import React, { useState } from 'react';

const ROOTS = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']

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

  function calculateRoot(originalRoot: string | undefined) {
    let root = null;

    if (originalRoot) {
      const r = ROOTS.indexOf(originalRoot);
      root = ROOTS[(ROOTS.length + (r + transpose)) % ROOTS.length];
    }

    return root;
  }

  const lines = () => {
    switch (type) {
      case DisplayType.INLINE: {
        return song?.lyrics?.map((line, index) => {
          return (
            <div className='line' key={`line${index}`}>
              {line?.map((l, index) => {
                return (
                  <React.Fragment key={index}>
                    <div><span className="chord">{calculateRoot(l?.c?.root)}{l?.c?.type}</span> {l?.w}</div>
                    <span>&nbsp;</span>
                  </React.Fragment>
                )
              })}
            </div>
          )
        })
      }
      default: {
        return song?.lyrics?.map((line, index) => {
          return (
            <div className='line' key={`line${index}`}>
              {line?.map((l, index) => {
                return (
                  <React.Fragment key={index}>
                    <div>
                      <div className="chord">{calculateRoot(l?.c?.root)}{l?.c?.type}</div>
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
      </div>

      <div className="song-actions">

        <select name="displayType" value={type} onChange={(e) => setType(parseInt(e.target.value))}>
          <option value={DisplayType.ABOVE}>Chords Above</option>
          <option value={DisplayType.INLINE}>Chords Inline</option>
        </select>

        <div>
          <button onClick={() => setTranspose(transpose - 1 <= -12 ? 0 : transpose - 1)}>-</button>
          <span>Transpose({transpose})</span>
          <button onClick={() => setTranspose(transpose + 1 >= 12 ? 0 : transpose + 1)}>+</button>
        </div>
      </div>

      <div>
        {lines()}
      </div>
    </div>
  )
}

export default Sheet;