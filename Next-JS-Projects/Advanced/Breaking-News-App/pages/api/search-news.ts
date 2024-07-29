// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type ErrRes = {
  error: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<INewsArticle[] | ErrRes>
) {
  const searchQuery = req.query.q?.toString();

  if (!searchQuery) {
    return res.status(400).json({ error: "Please provide a search query" })
  }
  try {
    const response = await fetch(`https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${process.env.NEWS_API_KEY}`)
    const newsResponse: INewsArticlesResponse = await response.json()
    res.status(200).json(newsResponse.articles)
  } catch (error) {
    res.status(400).json({ error: error })
  }
}
