import React, { useEffect, useState } from 'react';
import Sheet from './Sheet';
import Link from 'next/link';

const STORAGE_ID = 'chorditure-editor';

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
  const [isEditorVisible, setIsEditorVisible] = useState(true);
  const [rawLyrics, setRawLyrics] = useState('');

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_ID);

    if(stored) {
      setRawLyrics(stored);
    } else {
      setRawLyrics(EXAMPLE_LYRICS);
    }
  }, []);

  useEffect(() => {
    if(rawLyrics) {
      window.localStorage.setItem(STORAGE_ID, rawLyrics);
    }
  }, [rawLyrics])

  return (
    <div>
      <div className='p-8 bg-slate-50 flex justify-between'>
        <Link href={'/'}>
          <img className='w-6' src="/logo.svg" alt="chorditure" />
        </Link>
        <button className='border-2 text-slate-600 py-0.5 px-2 rounded md:hidden' onClick={() => setIsEditorVisible(!isEditorVisible)}>
          {isEditorVisible ? 'preview' : 'edit'}
        </button>
      </div>

      <div className='md:flex'>

        <textarea 
          className={`w-full md:w-[50%] min-h-screen p-10 bg-slate-50 focus:outline-none ${isEditorVisible ? 'block' : 'hidden'} md:block`} 
        value={rawLyrics} onChange={(e) => setRawLyrics(e.target.value)} name="lyrics" id="lyrics"></textarea>

        <div 
          className={`shadow-xl w-full md:w-[50%] min-h-screen px-10 pb-10 wrapper ${!isEditorVisible ? 'block' : 'hidden'} md:block`}
        >
          <Sheet data={rawLyrics}/>
        </div>
      </div>
    </div>
  )
}

export default Editor;