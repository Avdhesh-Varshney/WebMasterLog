interface INewsArticlesResponse {
    status: string,
    totalResults: number,
    articles: INewsArticle[]
}

interface INewsArticle {
    author: string,
    title: string,
    description: string,
    url: string,
    urlToImage?: string,
    publishedAt: string,
    content: string,
}