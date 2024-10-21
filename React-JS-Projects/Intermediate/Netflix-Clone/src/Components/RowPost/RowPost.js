import React, { useEffect, useState, useRef } from 'react';
import './RowPost.css';
import axios from '../../axios';
import { API_KEY, imageUrl } from '../../Constants/Constants';

function RowPost(props) {
  const [movies, setMovies] = useState([]);
  const postersRef = useRef(null); // Use a reference for the posters container

  useEffect(() => {
    axios.get(props.url).then((response) => {
      console.log(response.data);
      setMovies(response.data.results);
    });
  }, [props.url]); // Added dependency array to prevent infinite requests

  const handleMovie = (id) => {
    // Fetch the video details and open the video in a new tab
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then((response) => {
      if (response.data.results.length !== 0) {
        const videoKey = response.data.results[0].key;
        const youtubeUrl = `https://www.youtube.com/watch?v=${videoKey}`;
        window.open(youtubeUrl, '_blank'); // Open YouTube video in a new tab
      } else {
        console.log('No video available');
      }
    });
  };


  // Scroll handler function
  const scrollRow = (direction) => {
    const scrollAmount = direction === 'left' ? -300 : 300;
    postersRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <div className="row">
      <h2>{props.title}</h2>

      {/* Left arrow */}
      <div className="arrow left" onClick={() => scrollRow('left')}>
        {/* Empty as it's handled in CSS */}
      </div>

      {/* Posters row */}
      <div className="posters" ref={postersRef}>
        {movies.map((obj) => (
          <div className="poster-container" key={obj.id}>
            <img
              className={props.isSmall ? 'smallPoster' : 'poster'}
              src={`${imageUrl + obj.backdrop_path}`}
              alt="poster"
            />
            <div className="overlay">
              <button className="button-rowpost" onClick={() => handleMovie(obj.id)}>
                Play
              </button>
              <button className="button">
                Add to Watchlist
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Right arrow */}
      <div className="arrow right" onClick={() => scrollRow('right')}>
        {/* Empty as it's handled in CSS */}
      </div>
    </div>
  );
}

export default RowPost;
