import parseSong from '@/utils/parse-song';
import React, { useState } from 'react';

interface Props {
}

const LYRICS = `[title] 
crushcrushcrush

[artist] 
paramore

[lyrics]
[Bm]I've got a lot to [D]say to you
Yeah [A]I've got a lot to [Bm]Say
[Bm]I’ve noticed your eyes are [D]always glued to me
[A]Keeping them here and it makes no sense at all

[G]They taped over your [A]mouth
Scribbed out the [Bm]truth with their lies
Your little spies

[G] [F#]

[Bm]Crush crush crush, crush crush (two three four)

[Bm]Nothing [D]compares [A]to a quiet evening alone
[G]Just [Bm]the one [A]two of us who’s counting on
[Bm]That [D]never [A]happens I guess I’m dreaming again
[G]Let’s me more than [A]…this
`

const song = parseSong(LYRICS);

enum DisplayType {
  INLINE,
  ABOVE
}

const Sheet: React.FC<Props> = ({ }) => {
  const [type, setType] = useState(DisplayType.ABOVE);

  const lines = () => {
    switch (type) {
      case DisplayType.INLINE: {
        return song?.lyrics?.map((line) => {
          return (
            <div className='line'>
              {line?.map((l) => (
                <>
                  <div><span className="chord">{l?.c}</span> {l?.w}</div>
                  <span>&nbsp;</span>
                </>
              ))}
            </div>
          )
        })
      }
      default: {
        return song?.lyrics?.map((line) => {
          return (
            <div className='line'>
              {line?.map((l) => (
                <>
                  <div>
                    <div className="chord">{l?.c}</div>
                    <div>{l?.w}</div>
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