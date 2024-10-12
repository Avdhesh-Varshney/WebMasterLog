import React, { useEffect, useState } from 'react';
import './Banner.css';
import axios from '../../axios';
import { API_KEY, imageUrl } from '../../Constants/Constants';

function Banner() {
  const [movie, setMovie] = useState(null);

    const handleMovie = (id) => {
      // Fetch the video details and open the video in a new tab
      axios
        .get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
        .then((response) => {
          if (response.data.results.length !== 0) {
            const videoKey = response.data.results[0].key;
            const youtubeUrl = `https://www.youtube.com/watch?v=${videoKey}`;
            window.open(youtubeUrl, "_blank"); // Open YouTube video in a new tab
          } else {
            console.log("No video available");
          }
        });
    };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Fetch the list of trending movies from the API
        const response = await axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`);
        const movies = response.data.results;
        console.log(response.data)

        // Check if we have movies and then select a random one
        if (movies.length > 0) {
          const randomIndex = Math.floor(Math.random() * movies.length);
          const selectedMovie = movies[randomIndex];
          setMovie(selectedMovie);
          // console.log(selectedMovie)
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []); // Empty dependency array ensures this runs once on component mount

  return (
    <div
      style={{
        backgroundImage: `url(${movie ? imageUrl + movie.backdrop_path : ""})`,
      }}
      className="banner"
    >
      <div className="content">
        <h1 className="title">{movie ? movie.title || movie.name : ""}</h1>
        <div className="banner_buttons">
          <button className="button" onClick={() => handleMovie(movie.id)}>
            Play
          </button>
          <button className="button">My List</button>
        </div>
        <h1 className="description">{movie ? movie.overview : ""}</h1>
      </div>
      <div className="fade_bottom"></div>
    </div>
  );
}

export default Banner;
