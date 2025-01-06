"use client"
import React, { useState } from 'react';

function Page() {
  const [screenshots, setScreenshots] = useState([]);
  const [content, setContent] = useState('');

  const handleScreenshotUpload = (event) => {
    const files = Array.from(event.target.files);
    setScreenshots((prevScreenshots) => [...prevScreenshots, ...files]);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  return (
    <div>
      <h1 className='text-2xl text-center mt-5'>Need assistance to Enter?</h1>
      
      <div>
        <h2>Upload Screenshots</h2>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleScreenshotUpload}
        />
        <div>
          {screenshots.map((screenshot, index) => (
            <img
              key={index}
              src={URL.createObjectURL(screenshot)}
              alt={`screenshot-${index}`}
              style={{ width: '200px', margin: '10px' }}
            />
          ))}
        </div>
      </div>

      <div>
        <h2>Add Content</h2>
        <textarea
          value={content}
          onChange={handleContentChange}
          rows="5"
          cols="40"
          placeholder="Type your content here..."
        />
      </div>
    </div>
  );
}

export default Page;
