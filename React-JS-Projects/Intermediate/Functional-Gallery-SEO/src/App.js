import React, { useState, useEffect } from 'react';
import './App.css';
import Gallery from './components/Gallery';
import Lightbox from './components/Lightbox';

function App() {
  const [images, setImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [lightbox, setLightbox] = useState({ show: false, imgUrl: "", title: "" });

  const apiKey = "YOUR_API_KEY_HERE";
  const perPage = 15;

  const fetchImages = async (url) => {
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: apiKey
        }
      });
      const data = await response.json();
      return data.photos;
    } catch (error) {
      console.error("Error fetching images:", error);
      return [];
    }
  };

  const fetchAndDisplay = async (url) => {
    try {
      const newImages = await fetchImages(url);
      if (newImages.length === 0) {
        setImages([]);
      } else {
        setImages(prevImages => [...prevImages, ...newImages]);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
      setImages([]);
    }
  };

  const searchImages = () => {
    setCurrentPage(1);
    setImages([]);
    const apiUrl = `https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}&per_page=${perPage}`;
    fetchAndDisplay(apiUrl);
  };

  const loadMoreImages = () => {
    setCurrentPage(prevPage => prevPage + 1);
    const apiUrl = searchTerm ?
      `https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage + 1}&per_page=${perPage}` :
      `https://api.pexels.com/v1/curated?page=${currentPage + 1}&per_page=${perPage}`;
    fetchAndDisplay(apiUrl);
  };

  useEffect(() => {
    fetchAndDisplay(`https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`);
  }, []);

  return (
    <div className="App">
      <Gallery images={images} setLightbox={setLightbox} />
      {lightbox.show && <Lightbox lightbox={lightbox} setLightbox={setLightbox} />}
    </div>
  );
}

export default App;
