const express = require('express');
const path=require('path')
const axios = require('axios');
const cheerio = require('cheerio');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

router.post('/scrape', async (req, res) => {
    const url = req.body.url;
    if (!url) {
        return res.status(400).send('URL is required');
    }

    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const title= $('title').text(); // Example: Extract the title of the page

        const headings = [];
        $('h1, h2, h3').each((index, element) => {
            headings.push($(element).text());
        });

        // Extract paragraphs
        const paragraphs = [];
        $('p').each((index, element) => {
            paragraphs.push($(element).text());
        });

        // Extract links
        const links = [];
        $('a').each((index, element) => {
            links.push({
                text: $(element).text(),
                href: $(element).attr('href')
            });
        });

        // Prepare the scraped data
        const scrapedData = {
            title,
            headings,
            paragraphs,
            links
        };

        // Render the scraped data in a readable format
        res.send(`
            <h1>Scraped Data</h1>
            <h2>Title</h2>
            <p>${scrapedData.title}</p>
            <h2>Headings</h2>
            <ul>${scrapedData.headings.map(heading => `<li>${heading}</li>`).join('')}</ul>
            <h2>Paragraphs</h2>
            <ul>${scrapedData.paragraphs.map(paragraph => `<li>${paragraph}</li>`).join('')}</ul>
            <h2>Links</h2>
            <ul>${scrapedData.links.map(link => `<li><a href="${link.href}">${link.text}</a></li>`).join('')}</ul>
        `);
    } catch (error) {
        res.status(500).send('Error occurred while scraping the URL');
    }
});

module.exports = router;
