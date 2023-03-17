import parseSong from '@/utils/parse-song';
import React, { useState } from 'react';
import Sheet from './Sheet';

interface Props {
}

const Editor: React.FC<Props> = ({}) => {
  const [rawLyrics, setRawLyrics] = useState('');

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