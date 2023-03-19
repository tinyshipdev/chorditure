import { Handler } from '@netlify/functions'
import 'dotenv/config'
import { connect } from '@planetscale/database'
import fetch from 'node-fetch'

const config = {
  fetch,
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD
}

export const handler: Handler = async (event, context) => {
  const conn = connect(config)
  const results = await conn.execute('SELECT songs.id, songs.title, artists.name as artist from songs INNER JOIN artists on songs.artistId = artists.id;');

  return {
    statusCode: 200,
    body: JSON.stringify({
      songs: results?.rows || [],
    }),
  }
}
