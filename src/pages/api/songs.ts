import 'dotenv/config'
import { connect } from '@planetscale/database'
const config = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD
}

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const conn = connect(config)
  const results = await conn.execute('SELECT songs.id, songs.title, artists.name as artist from songs INNER JOIN artists on songs.artistId = artists.id;');

  console.log(results);
  res.status(200).json({ songs: results.rows })
}