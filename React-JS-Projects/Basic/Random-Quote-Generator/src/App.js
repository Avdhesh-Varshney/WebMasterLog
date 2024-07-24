import react ,{useEffect, useState} from "react";
import reactDom from "react-dom";
import './App.css';

export default function App(){

    const [quote , setQuote] =useState('');
    const[author,setAuthor]=useState('');

    const newquote = async()=>{
        const response = await fetch('https://dummyjson.com/quotes/random');
        const data = await response.json();
        setQuote(data.quote);
        setAuthor(data.author);
    }
     
    useEffect(()=>{
         newquote();
    },[])
    
    return(
        <>
        <h1>Random Quote Generator</h1>
          <div className="container">
             <div className="quote">
                {quote}
             </div>
             <div className="author">
                  {author}
             </div>
            <button onClick={newquote}>Generate New Quote</button>
          </div>
        </>
    )
}