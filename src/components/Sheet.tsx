import React, { useState } from 'react';

interface Props {
}

const song = {
  title: 'crushcrushcrush',
  artist: 'paramore',
  lines: [
    [
      { chord: 'Bm', word: "I've" },
      { chord: null, word: 'got' },
      { chord: null, word: "a" },
      { chord: null, word: "lot" },
      { chord: null, word: "to" },
      { chord: 'D', word: "say" },
      { chord: null, word: "to" },
      { chord: null, word: "you" }
    ],
    [
      { chord: null, word: "Yeah" },
      { chord: 'A', word: "I've" },
      { chord: null, word: 'got' },
      { chord: null, word: "a" },
      { chord: null, word: "lot" },
      { chord: null, word: "to" },
      { chord: 'Bm', word: "say" },
    ]
  ]
}

enum DisplayType {
  INLINE,
  ABOVE
}

const Sheet: React.FC<Props> = ({ }) => {
  const [type, setType] = useState(DisplayType.ABOVE);

  const lines = () => {
    switch (type) {
      case DisplayType.INLINE: {
        return song?.lines?.map((line) => {
          return (
            <div className='line'>
              {line?.map((l) => (
                <>
                  <div><span className="chord">{l?.chord}</span> {l?.word}</div>
                  <span>&nbsp;</span>
                </>
              ))}
            </div>
          )
        })
      }
      default: {
        return song?.lines?.map((line) => {
          return (
            <div className='line'>
              {line?.map((l) => (
                <>
                  <div>
                    <div className="chord">{l?.chord}</div>
                    <div>{l?.word}</div>
                  </div>
                  <span>&nbsp;</span>
                </>
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