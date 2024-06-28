const express= require('express')
const newsRouter = express.Router()
//axios help us in error handling and data is passed in json file, help in api
//for starting out and use api we will include axios
const axios=require('axios');

//This FUNCTION IS TO RENDER OUR NEWS PAGE that is news.ejs
//news.ejs ki saari javascript idhar hai

newsRouter.get('', async (req, res) => {
    // res.render('news')
    try {
        const newsAPI = await axios.get(`https://newsapi.org/v2/top-headlines?country=in&apiKey=YOUR_API_KEY`);
        // console.log(newsAPI.data)
        res.render('news', { articles: newsAPI.data.articles });
    } catch (err) {
        if(err.response) {
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
            res.render('news', { articles : null })
        } else if(err.request) {
            res.render('news', { articles : null })
            console.log(err.request)
        } else {
            res.render('news', { articles : null })
            console.error('Error', err.message)
        }
        // Render the news page with articles set to null
    }
});


newsRouter.post('', async(req, res) => {
    let search = req.body.search
    try {
        const newsAPI = await axios.get(`http://newsapi.org/v2/everything?q=${search}&apiKey=YOUR_API_KEY`)
        res.render('newsSearch', { articles : newsAPI.data.articles })
    } catch (err) {
        if(err.response) {
            res.render('newsSearch', { articles : null })
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if(err.request) {
            res.render('newsSearch', { articles : null })
            console.log(err.request)
        } else {
            res.render('newsSearch', { articles : null })
            console.error('Error', err.message)
        }
    } 
})


//In order to export this 
module.exports= newsRouter