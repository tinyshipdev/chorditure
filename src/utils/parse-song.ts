type Song = {
  title: string,
  artist: string,
  lyrics: string,
}

const ROOTS = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']

const CHORD_REGEX = /\[([A-G#])(.*?)\]/;

function calculateRoot(originalRoot: string | undefined, transpose: number) {
  let root = null;

  if (originalRoot) {
    const r = ROOTS.indexOf(originalRoot);
    root = ROOTS[(ROOTS.length + (r + transpose)) % ROOTS.length];
  }

  return root || originalRoot;
}

function parseLine(
  data: string, 
  transpose: number,
  raw: boolean,
): string {
  const split = data?.trim()?.split(' ');

  const result = split?.map((word) => {
    const w = word?.trim();

    const matches = w.match(CHORD_REGEX);

    const root = matches?.[1];
    const type = matches?.[2];

    if(root) {

      if(raw) {
        return `[${calculateRoot(root, transpose || 0)}${type}]`;
      }

      return `<b>${calculateRoot(root, transpose || 0)}${type}</b>`;
    }
    return word;
  }).join(' ');

  return result;
}

function parseSong(
  data: string, 
  transpose: number,
  raw: boolean
): Song {

  let song: Song = { title: '', artist: '', lyrics: '' };

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
        song.lyrics += parseLine(line, transpose, raw) + '\n';
      }
      i++;
    }
  }

  return song;
}

export default parseSong;