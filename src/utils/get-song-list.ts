import * as fs from 'fs';

async function getSongList() {
  const files = fs.readdirSync(process.cwd() + '/data');

  const f = files.map((fileName) => {
    const s = fileName.replace(/\.md$/, '').split('--')
    return {
      artist: s[0] || '',
      title: s[1] || '',
    }
  });

  return f;
}

export default getSongList;