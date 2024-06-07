// src/controllers/urlController.js
const Url = require('../models/urlModel');
const UrlShortener = require('../utils/urlShortener');

class UrlController {
    static async shortenUrl(req, res) {
        try {
            const { originalUrl } = req.body;
            if (!originalUrl || typeof originalUrl !== 'string') {
                return res.status(400).json({ message: "A valid URL is required" });
            }

            // Check if the URL is already shortened
            const url = await Url.findOne({ originalUrl });
            if (url) {
                return res.json(url);
            }

            // Generate a short URL
            const shortUrl = UrlShortener.generateShortUrl();

            // Save to the database
            const newUrl = new Url({ originalUrl, shortUrl });
            await newUrl.save();
            res.json(newUrl);
        } catch (err) {
            res.status(500).json({ message: 'Server error: ' + err.message });
        }
    }

    static async redirectToOriginalUrl(req, res) {
        try {
            const { shortUrl } = req.params;
            if (!shortUrl || typeof shortUrl !== 'string') {
                return res.status(400).send('Invalid short URL');
            }

            const url = await Url.findOne({ shortUrl });
            if (!url) {
                return res.status(404).send('URL NOT FOUND');
            }

            // Increase the count
            url.clicks += 1;
            await url.save();
            res.redirect(url.originalUrl);
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    }
}

module.exports = UrlController;
