import type { NextApiRequest, NextApiResponse } from 'next'
import NextCors from 'nextjs-cors'

export type ShortUrl = {
  id: number
  url: string
}

const urls: string[] = []

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  })

  if (req.method === 'POST') {
    const { url } = req.body
    const id = urls.push(url) - 1
    res.status(201).json(id)
  } else if (req.method === 'GET') {
    res.json(urls.map((url, id) => ({ url, id })))
  }
}
