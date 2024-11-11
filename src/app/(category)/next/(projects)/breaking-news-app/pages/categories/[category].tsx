import Head from "next/head";
import { useRouter } from "next/router";
import NewsArticlesGrid from "@/components/NewsArticlesGrid";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { Alert } from "react-bootstrap";

type CategoryNewsPageProps = {
	articles: INewsArticle[];
};
const CategoryNewsPage = ({ articles }: CategoryNewsPageProps) => {
	const router = useRouter();
	const categoryName = router.query.category?.toString();
	const title = `Category: ${categoryName}`;
	return (
		<>
			<Head>
				<title key={"title"}>{`${title} - NextJS News App`}</title>
			</Head>
			<main>
				<h1>{title}</h1>
				<Alert>
					This page is uses <strong>getStaticProps</strong> for very high page
					loading speed and <strong>incremental static regeneration</strong> to
					show data not older then 5 minutes.
				</Alert>
				<NewsArticlesGrid articles={articles} />
			</main>
		</>
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	const categorySlugs = [
		"business",
		"entertainment",
		"general",
		"health",
		"science",
		"sports",
		"technology",
	];

	const paths = categorySlugs.map((slug) => ({
		params: { category: slug },
	}));
	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps<CategoryNewsPageProps> = async ({
	params,
}: GetStaticPropsContext) => {
	const category = params?.category?.toString();
	const response = await fetch(
		`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${process.env.NEWS_API_KEY}`
	);
	const newsResponse: INewsArticlesResponse = await response.json();
	return {
		props: { articles: newsResponse.articles },
		//? Incremantal static regeneration.
		//? It means revalidate page content every (5 * 60 = 5 minutes).
		revalidate: 5 * 60,
	};
	// Let error go to 500 page
};

export default CategoryNewsPage;
