import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { NewsArticle } from '@/models/NewsArticles';
import NewsArticleGrid from '@/components/NewsArticleGrid';
import { useState } from 'react';
import useSWR from 'swr';
import { BASE_URL } from '../constants';

interface NewsPageProps {
  newsArticles: NewsArticle[];
}

export const getServerSideProps: GetServerSideProps<
  NewsPageProps
> = async () => {
  const response = await fetch(BASE_URL + 'api/news');
  const newsResponse: NewsArticle[] = await response.json();
  return {
    props: { newsArticles: newsResponse },
  };
  // let error go to 500 page
};

export default function NewsPage({ newsArticles }: NewsPageProps) {
  // Create a state variable for the conclusion data
  const [conclusion, setConclusion] = useState('');

  // Use the useSWR hook to fetch the data from the "news-conclusion" endpoint
  useSWR('/api/news-conclusion', async () => {
    // Use the first news articles' titles as the prompt
    const prompt = newsArticles
      .slice(0, 5)
      .map((article) => article.title)
      .join('; ');

    // Encode the prompt as a query parameter
    const encodedPrompt = encodeURIComponent(prompt);

    // Make a request to the API endpoint with the prompt
    const response = await fetch(
      '/api/news-conclusion?prompt=' + encodedPrompt,
    );
    const data = await response.json();

    // Update the conclusion state with the response data
    setConclusion(data.conclusion);
  });

  return (
    <>
      <Head>
        <title key="title">News Glance</title>
        {/* Add a description meta tag that summarizes the content of your page */}
        <meta
          name="description"
          content="A website that displays top ten news articles and uses AI to generate a conclusion based on the first five titles."
        />
        {/* Add some keywords meta tag that are relevant to your page */}
        <meta
          name="keywords"
          content="Next.js, News, AI, Conclusion, Headlines, News Glance"
        />
        {/* Add some social media meta tags that can improve the sharing of your page on platforms like Facebook and Twitter */}
        {/* Use the og: prefix for Open Graph meta tags */}
        <meta property="og:title" content="News Glance" />
        <meta
          property="og:description"
          content="A website that displays top ten news articles and uses AI to generate a conclusion based on the first five titles."
        />
        {/* Use the og:image meta tag to specify an image that will be displayed when your page is shared */}
        {/* You can use any image URL that is publicly accessible */}
        <meta
          property="og:image"
          content="https://news.turskyi.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fnews_article_placeholder.0b951b56.jpeg&w=1080&q=75"
        />
        {/* Use the twitter: prefix for Twitter meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="News Glance" />
        <meta
          name="twitter:description"
          content="A website that displays top ten news articles and uses AI to generate a conclusion based on the first five titles."
        />
        {/* Use the twitter:image meta tag to specify an image that will be displayed when your page is shared on Twitter */}
        {/* You can use the same image URL as the og:image meta tag */}
        <meta
          name="twitter:image"
          content="https://news.turskyi.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fnews_article_placeholder.0b951b56.jpeg&w=1080&q=75"
        />
      </Head>
      <main>
        <h1>News Glance</h1>
        {/* Display the title for the conclusion using a <h2> tag */}
        {conclusion && (
          <h2 style={{ textAlign: 'center', color: 'green' }}>
            Conclusion from News Headlines
          </h2>
        )}
        {/* Display the conclusion from the conclusion state using a <p> tag */}
        <p style={{ fontSize: '32px', fontWeight: 'bold' }}>{conclusion}</p>
        {/* This page uses getServerSideProps to fetch data server-side on every request
            This allows search engines to crawl the page content and improves SEO. */}
        <NewsArticleGrid articles={newsArticles} />
      </main>
    </>
  );
}
