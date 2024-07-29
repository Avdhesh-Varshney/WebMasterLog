import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import styles from "@/styles/app.module.css";
import Head from "next/head";
import NextNProgress from "nextjs-progressbar";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { Container } from "react-bootstrap";
import NavBar from "@/components/NavBar";
const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<div className={inter.className}>
				<Head>
					<title key={"title"}>Nextjs News App</title>
					<meta
						name="description"
						content="Nextjs news application"
						key={"description"}
					/>
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<NextNProgress />
				<NavBar />
				<Container className={styles.pageContainer}>
					<Component {...pageProps} />
				</Container>
			</div>
		</>
	);
}
