new Vue({
  el: "#app",
  data: {
    quotes: [],
    currentQuote: "",
    currentQuoteAuthor: "",
    animating: false,
    quotes_api_url: "https://type.fit/api/quotes"
  },
  methods: {
    newQuote: function () {
      this.randomizeQuote()
      this.animating = true
      setTimeout(() => {
        this.animating = false
      }, 1000)
    },
    randomizeQuote: function() {
      const num = Math.floor(Math.random() * this.quotes.length)
      this.currentQuote = this.quotes[num].text
      this.currentQuoteAuthor = this.quotes[num].author
    }
  },
  mounted: function() {
   fetch(this.quotes_api_url)
    .then(response => response.json())
    .then(quotes => {
      this.quotes = quotes
      this.randomizeQuote()
    });
  }
})
