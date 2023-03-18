import { Chord } from '@/utils/types';
import React, { useState } from 'react';

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
              {line?.map((l, index) => (
                <React.Fragment key={index}>
                  <div>
                    <div className="chord">{l?.c?.root}{l?.c?.type}</div>
                    <div>{l?.w}</div>
                  </div>
                  <span>&nbsp;</span>
                  </React.Fragment>
              ))}
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
      </div>

      <div>
        {lines()}
      </div>
    </div>
  )
}

export default Sheet;