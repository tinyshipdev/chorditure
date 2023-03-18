import parseSong from '@/utils/parse-song';
import React, { useState } from 'react';
import Sheet from './Sheet';


const EXAMPLE_LYRICS = `[title] 
example song

[artist] 
chorditure

[lyrics]
[Bm]Write your lyrics in the [G]left sidebar
[A]Follow the syntax and [F#m]you'll get far

[G]This is an example song
To [A]help you [A7]use chorditure [D]

[D] [Dsus4] [D]`

interface Props {
}

const Editor: React.FC<Props> = ({}) => {
  const [rawLyrics, setRawLyrics] = useState(EXAMPLE_LYRICS);

  return (
    <div className='flex'>

      <textarea className='w-[30%] min-h-screen p-10 bg-slate-50 focus:outline-none' value={rawLyrics} onChange={(e) => setRawLyrics(e.target.value)} name="lyrics" id="lyrics"></textarea>

      <div className='w-[70%] min-h-screen p-10 wrapper'>
        <Sheet song={parseSong(rawLyrics)}/>
      </div>
    </div>
  )
}

export default Editor;