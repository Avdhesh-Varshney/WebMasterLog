const axios = require('axios');
const cheerio = require('cheerio');

exports.scrape = async (url) => {
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);
  
  const title = $('title').text();
  const metaDescription = $('meta[name="description"]').attr('content');
  
  return { title, metaDescription };
};
