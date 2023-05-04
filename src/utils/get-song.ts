import { connect } from '@planetscale/database'

const config = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD
}

async function getSong(song: string, artist: string) {
  const conn = connect(config)
  const results = await conn.execute(`SELECT songs.id, songs.data FROM songs INNER JOIN artists on songs.artistId = artists.id WHERE songs.title=? AND artists.name=?;`, [song, artist]);

  return results?.rows?.[0] || [];
}

export default getSong;