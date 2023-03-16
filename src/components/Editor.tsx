import parseSong from '@/utils/parse-song';
import React, { useState } from 'react';

const TEST_LYRICS = `[title] 
crushcrushcrush

[artist] 
paramore

[lyrics]
[Bm]I've got a lot to [D]say to you
Yeah [A]I've got a lot to [Bm]Say
[Bm]I’ve noticed your eyes are [D] always glued to me
[A] Keeping them here and it makes no sense at all

[G] They taped over your [A] mouth
Scribbed out the [Bm] truth with their lies
Your little spies`

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
        {JSON.stringify(parseSong(TEST_LYRICS))}
      </div>
    </div>
  )
}

export default Editor;