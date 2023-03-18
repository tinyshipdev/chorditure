import { Chord } from "./types";

const CHORD_REGEX = /[a-zA-Z0-9#]+/; // matches Am, F#7, etc
const CHORD_BRACKET_REGEX = /\[[a-zA-Z0-9#]+\]/; // matches [Am], [F#7], etc
const CHORD_TYPE_REGEX = /(maj|min|dim)[0-9]|m|0-9/i

function parseLine(data: string) {
  const split = data?.trim()?.split(' ');

  const result = split?.map((word) => {
    const w = word?.trim();

    if(w[0] !== '[') {
      return { c: null, w };
    }

    const rawChord = w.match(CHORD_REGEX)?.[0];

    const root = rawChord?.replace(CHORD_TYPE_REGEX, '');
    const type = rawChord?.match(CHORD_TYPE_REGEX)?.[0];
    
    const chord: Chord = {
      root: root || '',
      type: type || '',
    }

    return { c: chord || null, w: w.replace(CHORD_BRACKET_REGEX, '') };
  })

  return result;
}

function parseSong(data: string): { 
  title: string, 
  artist: string, 
  lyrics: { c: Chord | null, w: string }[][] 
} {

  let song: { 
    title: string, 
    artist: string, 
    lyrics: { c: Chord | null, w: string }[][] 
  } = {
    title: '',
    artist: '',
    lyrics: []
  }

  const split = data?.trim()?.split('\n');

  let isLyrics = false;
  let i = 0;
  
  while(i < split.length) {
    const line = split[i]?.trim();

    if(line.substring(0, 7) === '[title]') {
      song.title = split[i + 1]?.trim();
      i += 2;
    }
    else if(line.substring(0, 8) === '[artist]') {
      song.artist = split[i + 1]?.trim();
      i += 2;
    }else if(line.substring(0, 8) === '[lyrics]') {
      isLyrics = true;
      i++;
    } else {
      if(isLyrics) {
        song.lyrics.push(parseLine(line));
      }
      i++;
    }
  }

  return song;
}

export default parseSong;