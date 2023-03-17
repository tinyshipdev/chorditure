import parseSong from '@/utils/parse-song';
import React, { useState } from 'react';
import Sheet from './Sheet';


const EXAMPLE_LYRICS = `[title] 
example song

[artist] 
chorditure

[lyrics]
[Bm]Write your lyrics in the [G]left sidebar
[A]Follow the syntax and [Fm]you'll get far

[G]This is an example song
To [A]help you use [D]chorditure`

interface Props {
}

const Editor: React.FC<Props> = ({}) => {
  const [rawLyrics, setRawLyrics] = useState(EXAMPLE_LYRICS);

  return (
    <div className='editor-container'>

      <textarea className='editor' value={rawLyrics} onChange={(e) => setRawLyrics(e.target.value)} name="lyrics" id="lyrics"></textarea>

      <div className='editor-preview'>
        <Sheet song={parseSong(rawLyrics)}/>
      </div>
    </div>
  )
}

export default Editor;