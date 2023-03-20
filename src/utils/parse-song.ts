import { Chord } from "./types";

const BRACKET_REGEX = /\[(.*?)\]/;
const CHORD_BRACKET_REGEX = /\[[a-zA-Z0-9#]+\]/; // matches [Am], [F#7], etc
const CHORD_TYPE_REGEX = /((maj|min|dim|sus|m)[0-9]?)|([0-9])/i

const CHORD_TYPE = /\[[A-Z#]{1,2}(.*?)\]/

const CHORD_REGEX = /\[([A-Z#]{1,2})(.*?)\]/;
const WORD_REGEX = /\[([A-Z#]{1,2})(.*?)\](.*$)/

function parseLine(data: string) {
  const split = data?.trim()?.split(' ');

  const result = split?.map((word) => {
    const w = word?.trim();

    const matches = w.match(WORD_REGEX);

    console.log(matches);

    if(!matches?.[1]) {
      return { c: null, w };
    }

    const chord: Chord = {
      root: matches?.[1] || '',
      type: matches?.[2] || '',
    }

    return { c: chord || null, w: matches?.[3] };
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