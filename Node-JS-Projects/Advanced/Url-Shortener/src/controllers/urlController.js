const Url = require('../models/urlModel');
const UrlShortener = require('../utils/urlShortener');
class UrlController {
    static async shortenUrl(req, res) {
        try {
            const { originalUrl } = req.body;
            if (!originalUrl)
                return res.status(400).json({ message: "URL is required" });
            //check if the url is already shortened
            let url = await Url.findOne({ originalUrl });
            if (url) {
                return res.json(url);
            }
            //generate a short url
            const shortUrl = UrlShortener.generateShortUrl();
            //save to the database
            url = new Url({
                originalUrl, shortUrl
            });
            await url.save();
            res.json(url);
        } catch (err) {
            res.status(500).json({ message: 'Sever error : ' + err.message });
        }
    }
    static async redirectToOriginalUrl(req, res) {
        try {
            const { shortUrl } = req.params;
            const url = await Url.findOne({ shortUrl: shortUrl });
            if (!url) {
                return res.status(404).send('URL NOT FOUND');
            }
            //increase the count
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