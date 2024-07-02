import React from 'react';

const Lightbox = ({ lightbox, setLightbox }) => {
  return (
    <div className="lightbox show">
      <div className="lightbox-content">
        <span className="close-icon" onClick={() => setLightbox({ show: false, imgUrl: "", title: "" })}>
          <i className="uil uil-times"></i>
        </span>
        <img src={lightbox.imgUrl} alt="lightbox" />
        <h2 className="photo-title">{lightbox.title}</h2>
        <div className="button-group">
          <button className="download-btn" onClick={() => downloadImage(lightbox.imgUrl)}>
            <i className="uil uil-download-alt"></i> Download
          </button>
          <button className="open-in-tab-btn" onClick={() => openInNewTab(lightbox.imgUrl)}>
            <i className="uil uil-external-link-alt"></i> Open in New Tab
          </button>
        </div>
      </div>
    </div>
  );
};

const downloadImage = (imageUrl) => {
  fetch(imageUrl, {
    headers: {
      Authorization: "8UlytL660WproZ8seBUDTq7AbBjiRzjGK9SWBAS1tyAtiAelFObfBna6"
    }
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
      a.remove();
      window.URL.revokeObjectURL(url);
    })
    .catch(error => console.error('Error downloading image:', error));
};

const openInNewTab = (url) => {
  window.open(url, '_blank');
};

export default Lightbox;
