import React from 'react'
import './App.css'
const App = () => {
  document.addEventListener('DOMContentLoaded',()=>{
    const quote = document.getElementById('quote');
    const btn = document.getElementById('quote-btn');
    const quotes = [
      "The only way to do great work is to love what you do. - Steve Jobs",
      "Success is not the key to happiness. Happiness is the key to success. - Albert Schweitzer",
      "The best time to plant a tree was 20 years ago. The second best time is now. - Chinese Proverb",
      "Your time is limited, don’t waste it living someone else’s life. - Steve Jobs",
      "The only limit to our realization of tomorrow is our doubts of today. - Franklin D. Roosevelt",
      "Do not watch the clock. Do what it does. Keep going. - Sam Levenson",
      "Keep your face always toward the sunshine—and shadows will fall behind you. - Walt Whitman",
      "The only way to achieve the impossible is to believe it is possible. - Charles Kingsleigh",
      "Act as if what you do makes a difference. It does. - William James",
      "Success usually comes to those who are too busy to be looking for it. - Henry David Thoreau",
      "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
      "The future depends on what you do today. - Mahatma Gandhi",
      "The way to get started is to quit talking and begin doing. - Walt Disney",
      "Don’t let yesterday take up too much of today. - Will Rogers",
      "You learn more from failure than from success. Don’t let it stop you. Failure builds character. - Unknown"
    ];
    function getDailyQuote() {
      const today = new Date();
      const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
      return quotes[dayOfYear % quotes.length];
    }
    quote.innerHTML = getDailyQuote();
    btn.addEventListener('click',() => {
      const randomIndex = Math.floor(Math.random()*quotes.length);
      quote.innerHTML = quotes[randomIndex];
    })
  })

  return (
    <div className='container'>
      <h1>Motivation For The Day</h1>
      <p id="quote"></p>
      <button id="quote-btn">See More</button>
    </div>
  )
}

export default App
