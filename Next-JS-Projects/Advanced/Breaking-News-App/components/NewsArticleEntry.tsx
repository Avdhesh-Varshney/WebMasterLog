import placeholderImage from "@/assets/images/newsarticle_placeholder.jpg";
import { Card } from "react-bootstrap";
import Image from "next/image";
import styles from "@/styles/NewsArticleEntry.module.css";

type NewsArticleEntryProps = {
	article: INewsArticle;
};
const NewsArticleEntry = ({
	article: { title, description, author, url, urlToImage },
}: NewsArticleEntryProps) => {
	const validImageUrl =
		urlToImage?.startsWith("http://") || urlToImage?.startsWith("https://")
			? urlToImage
			: undefined;

	return (
		<a href={url} target="__blank">
			<Card className="h-100">
				{/* <Card.Img src={validImageUrl} variant="top" /> */}
				<Image
					className={`card-img-top ${styles.image}`}
					src={validImageUrl || placeholderImage}
					width={400}
					height={100}
					alt="News article image"
				/>
				<Card.Body>
					<Card.Title>{title}</Card.Title>
					<Card.Text>{description}</Card.Text>
				</Card.Body>
			</Card>
		</a>
	);
};

export default NewsArticleEntry;
