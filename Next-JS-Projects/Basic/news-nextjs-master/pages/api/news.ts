// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NewsResponse } from '@/models/NewsArticles';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
    const countryCode = request.query.country || 'ca';
    const result = await fetch(`https://newsapi.org/v2/top-headlines?country=${countryCode}&apiKey=4a5d98ed28e74ef081ce33ba3e140bdf`);
    const newsResponse: NewsResponse = await result.json();
    return response.status(200).json(newsResponse.articles);
}
