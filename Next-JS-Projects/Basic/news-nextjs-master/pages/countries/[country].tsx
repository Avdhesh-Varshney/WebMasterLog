import NewsArticleGrid from '@/components/NewsArticleGrid';
import { NewsArticle, NewsResponse } from '@/models/NewsArticles';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

interface CountryNewsPageProps {
  newsArticles: NewsArticle[];
}

export const getStaticPaths: GetStaticPaths = async () => {
  const countryOptions = [
    // this could be coming from an API
    'ca',
    'ua',
    'us',
    'at',
    'au',
    'be',
    'bg',
    'br',
    'ca',
    'ch',
   'cn',
    'co',
    'cu',
    'cz',
    'de',
    'eg',
    'fr',
    'gb',
    'gr',
    'hk',
    'hu',
    'id',
    'ie',
    'il',
    'in',
    'it',
    'jp',
    'kr',
    'lt',
    'lv',
    'ma',
    'mx',
    'my',
    'ng',
    'nl',
    'no',
    'nz',
    'ph',
    'pl',
    'pt',
    'ro',
    'rs',
    'ru',
    'sa',
    'se',
    'sg',
    'si',
    'sk',
    'th',
    'tr',
    'tw',
    'ua',
    'us',
    've',
    'za',
  ];

  const paths = countryOptions.map((option) => ({
    params: { country: option },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<CountryNewsPageProps> = async ({
  params,
}) => {
  const country = params?.country?.toString();
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=4a5d98ed28e74ef081ce33ba3e140bdf`,
  );
  const newsResponse: NewsResponse = await response.json();
  return {
    props: { newsArticles: newsResponse.articles },
    revalidate: 5 * 60,
  };
  // let error go to 500 page
};

const CountryNewsPage = ({ newsArticles }: CountryNewsPageProps) => {
  const router = useRouter();
  const countryCode = router.query.country?.toString();

  const title = 'Country code: ' + countryCode;

  return (
    <>
      <Head>
        <title key="title">{title}</title>
      </Head>
      <main>
        <h1>{title}</h1>

        {/* This is page uses getStaticProps for very high page loading speed
                    and incremental static regeneration to show data not older than 5 minutes. */}

        <NewsArticleGrid articles={newsArticles} />
      </main>
    </>
  );
};

export default CountryNewsPage;
