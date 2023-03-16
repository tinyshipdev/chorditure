function parseLine(data: string) {
  const split = data?.trim()?.split(' ');

  const result = split?.map((word) => {
    const w = word?.trim();

    if(w[0] === '[') {
      let i = 1;
      let chord = '';
      let end = 0;

      while(i < w.length) {
        let char = w[i];

        if(char === ']') {
          end = i;
          break;
        }

        chord += char;
        i++;
      }

      return { c: chord, w: word.substring(end + 1) };
    } else {
      return { c: null, w };
    }
  })

  return result;
}

function parseSong(data: string): { title: string, artist: string, lyrics: { c: string | null, w: string }[][] } {
  let song: { title: string, artist: string, lyrics: { c: string | null, w: string }[][] } = {
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
      if(line) {
        song.lyrics.push(parseLine(line));
      }
      i++;
    }
  }

  return song;
}

export default parseSong;