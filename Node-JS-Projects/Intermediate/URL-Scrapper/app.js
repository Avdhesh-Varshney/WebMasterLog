const express = require('express');
const app = express();
const port = 3000;


app.use(express.json());
app.use(express.static('public'));


const scrapeRoutes = require('./routes/scrapeRoutes');
app.use('/scrape', scrapeRoutes);

app.listen(port, () => {
  console.log(` app listening at http://localhost:${port}`);
});
