import NewsArticlesGrid from "@/components/NewsArticlesGrid";
import Head from "next/head";
import { FormEvent, useState } from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";

const SearchPage = () => {
	const [searchQuery, setSearchQuery] = useState<string | undefined>();
	const [searchResults, setSearchResults] = useState<INewsArticle[] | null>(
		null
	);
	const [searchResultsLoading, setSearchResultsLoading] = useState(false);
	const [searchResultsLoadingIsError, setSearchResultsLoadingIsError] =
		useState(false);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (searchQuery) {
			try {
				setSearchResults(null);
				setSearchResultsLoadingIsError(false);
				setSearchResultsLoading(true);
				const response = await fetch(`/api/search-news?q=${searchQuery}`);
				const articles: INewsArticle[] = await response.json();
				setSearchResults(articles);
			} catch (error) {
				console.error(error);
				setSearchResultsLoadingIsError(true);
			} finally {
				setSearchResultsLoading(false);
			}
		}
	};

	return (
		<>
			<Head>
				<title key={"title"}>Search News | NextJS News App</title>
			</Head>
			<main>
				<h1>Search News</h1>
				<Alert>
					This page uses <strong>client-side data fetching</strong> to show
					fresh data for every search.
					<br />
					Requests are handled by our backend via <strong>API routes.</strong>
				</Alert>
				<Form onSubmit={handleSubmit}>
					<Form.Group className="mb-3" controlId="search-input">
						<Form.Label>Search query</Form.Label>
						<Form.Control
							name="searchQuery"
							placeholder="E.g. politics, sports, ..."
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</Form.Group>
					<Button
						type="submit"
						className="mb-3"
						disabled={searchResultsLoading}
					>
						Search
					</Button>
				</Form>

				<div className="d-flex flex-column align-items-center">
					{searchResultsLoading && <Spinner animation="border" />}
					{searchResultsLoadingIsError && (
						<p>Something went wrong please try again!</p>
					)}
					{searchResults?.length === 0 && (
						<p>Nothing found. Try a differet query</p>
					)}
					{searchResults && <NewsArticlesGrid articles={searchResults} />}
				</div>
			</main>
		</>
	);
};

export default SearchPage;
