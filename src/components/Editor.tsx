import parseSong from '@/utils/parse-song';
import React, { useState } from 'react';

const TEST_LYRICS = `[title] 
crushcrushcrush

[artist] 
paramore

[lyrics]
[Bm]I've got a lot to [D]say to you
Yeah [A]I've got a lot to [Bm]Say`

interface Props {
}

const Editor: React.FC<Props> = ({}) => {
  const [rawLyrics, setRawLyrics] = useState(TEST_LYRICS);

  const editorLyrics = rawLyrics?.trim()?.split('\n')?.map((line) => {
    return (
      <div className='editor-line'>
        {line?.split(' ')?.map((word) => {
          return (
            <div>
              <input className='editor-text-input' value={''}/>
              <input className='editor-text-input' value={word}/>
            </div>
          )
        })}
      </div>
    )
  })

  return (
    <div className='editor'>

      <div>
        <label htmlFor="lyrics">paste lyrics here</label>
        <br />
        <textarea value={rawLyrics} onChange={(e) => setRawLyrics(e.target.value)} name="lyrics" id="lyrics" cols={100} rows={30}></textarea>
      </div>

      <div>
      </div>
    </div>
  )
}

export default Editor;