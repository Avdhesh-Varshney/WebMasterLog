import React, { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash.debounce';
import Header from './Header';
import '../App.css';

const Gallery = () => {
    const [images, setImages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [lightbox, setLightbox] = useState({ isVisible: false, imgSrc: '', title: '' });

    const apiKey = "8UlytL660WproZ8seBUDTq7AbBjiRzjGK9SWBAS1tyAtiAelFObfBna6";
    const perPage = 15;

    useEffect(() => {
        if (searchTerm.trim() === '') {
            fetchImages(`https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`);
        } else {
            searchImages();
        }
    }, [currentPage, searchTerm]);

    const fetchImages = async (url) => {
        try {
            const response = await fetch(url, {
                headers: {
                    Authorization: apiKey,
                },
            });
            const data = await response.json();
            setImages((prevImages) => [...prevImages, ...data.photos]);
        } catch (error) {
            console.error("Error fetching images:", error);
        }
    };

    const searchImages = useCallback(debounce(() => {
        setCurrentPage(1);
        setImages([]);
        const query = searchTerm.trim();
        fetchImages(`https://api.pexels.com/v1/search?query=${query}&page=1&per_page=${perPage}`);
    }, 500), [searchTerm]);

    const loadMoreImages = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const openLightbox = (imgSrc, title) => {
        setLightbox({ isVisible: true, imgSrc, title });
        document.body.style.overflow = "hidden";
    };

    const closeLightbox = () => {
        setLightbox({ isVisible: false, imgSrc: '', title: '' });
        document.body.style.overflow = "auto";
    };

    const downloadImage = (imageUrl) => {
        fetch(imageUrl, {
            headers: {
                Authorization: apiKey,
            },
        })
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'downloaded-image.jpg';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        })
        .catch(error => console.error('Error downloading image:', error));
    };

    const openInNewTab = (url) => {
        window.open(url, '_blank');
    };

    return (
        <div className="container">
            <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} searchImages={searchImages} />
            <div className="gallery">
                {images.map((image) => (
                    <div className="card" key={image.id}>
                        <img 
                            src={image.src.medium} 
                            alt={image.photographer}
                            onClick={() => openLightbox(image.src.original, image.photographer)}
                        />
                        <div className="details">
                            <div className="photographer">
                                <i className="uil uil-camera"></i> <span>{image.photographer}</span>
                            </div>
                            <div className="button-group">
                                <button className="gallery-btn" onClick={() => downloadImage(image.src.original)}>
                                    <i className="uil uil-download-alt"></i> Download
                                </button>
                                <button className="gallery-btn" onClick={() => openInNewTab(image.src.original)}>
                                    <i className="uil uil-external-link-alt"></i> Open in New Tab
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {images.length > 0 && (
                <button className="load-more" onClick={loadMoreImages}>
                    Load More
                </button>
            )}
            {lightbox.isVisible && (
                <div className="lightbox" onClick={closeLightbox}>
                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <img src={lightbox.imgSrc} alt={lightbox.title} />
                        <h2>{lightbox.title}</h2>
                        <button onClick={closeLightbox}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Gallery;
