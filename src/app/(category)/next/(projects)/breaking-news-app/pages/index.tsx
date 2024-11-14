import NewsArticlesGrid from "@/components/NewsArticlesGrid";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { Alert } from "react-bootstrap";

type BreakingNewsPageProps = {
	newsArticles?: INewsArticle[];
};
export default function BreakingNewsPage({
	newsArticles,
}: BreakingNewsPageProps) {
	return (
		<>
			<Head>
				<title key={"title"}>Breaking news - Nextjs News App</title>
			</Head>
			<main>
				<h1>Breaking News</h1>

				<Alert>
					This page uses <strong>getServerSideProps</strong> to fetch data
					server-side on every request.
					<br />
					This allows to search engines to crawl the page content and{" "}
					<strong>improves SEO</strong>.
				</Alert>
				{newsArticles !== undefined ? (
					<>
						<NewsArticlesGrid articles={newsArticles} />
					</>
				) : (
					<h1>Error</h1>
				)}
			</main>
		</>
	);
}

export const getServerSideProps: GetServerSideProps<
	BreakingNewsPageProps
> = async () => {
	const response = await fetch(
		`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`
	);
	const newsResponse: INewsArticlesResponse = await response.json();
	return {
		props: {
			newsArticles: newsResponse.articles,
		},
	};
	// Let error go to 500 page
};
