import * as fs from 'fs';

async function getSong(song: string, artist: string) {
  return fs.readFileSync(`${process.cwd()}/data/${artist}--${song}.md`, 'utf-8');
}

export default getSong;