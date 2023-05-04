import { connect } from '@planetscale/database'

const config = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD
}

async function getSongList() {
  const conn = connect(config)
  const results = await conn.execute('SELECT songs.id, songs.title, artists.name as artist from songs INNER JOIN artists on songs.artistId = artists.id;');
  return results?.rows || [];
}

export default getSongList;