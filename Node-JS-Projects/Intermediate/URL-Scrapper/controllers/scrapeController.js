const scrapeModel = require('../models/scrapeModel');

exports.scrapeUrl = async (req, res) => {
  try {
    const { url } = req.body;
    const scrapedData = await scrapeModel.scrape(url);
    res.json(scrapedData);
  } catch (error) {
    console.error('Error scraping URL:', error.message);
    res.status(500).json({ error: 'An error occurred while scraping the URL' });
  }
};
