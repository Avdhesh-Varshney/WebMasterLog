
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [temp, setTemp] = useState("");
  const [url, setUrl] = useState("");
  const [size, setSize] = useState(250);
  const [bgColor, setBgColor] = useState("ffffff");
  const [qrCode, setQrCode] = useState("");
  const [showDownloadButton, setShowDownloadButton] = useState(false); 

  // Changing the URL only when the user
  // changes the input
  useEffect(() => {
    setQrCode(`http://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(url)}&size=${size}x${size}&bgcolor=${bgColor}`);
  }, [url, size, bgColor]);

  // Function to handle input change and validate URL
  function handleInputChange(event) {
    setTemp(event.target.value);
  }

  // Function to handle URL submission
  function handleSubmit(event) {
    event.preventDefault();
    if (isValidUrl(temp)) {
      setUrl(temp);
      setShowDownloadButton(true); // Show the download button
    } else {
      alert("Invalid URL. Please enter a valid URL.");
    }
  }

  // Function to check if a string is a valid URL
  function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }

  // Function to handle QR code download
  function handleDownload() {
    const downloadLink = document.createElement('a');
    downloadLink.href = qrCode;
    downloadLink.download = 'qrcode.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  return (
    <div className="App">
      <h1>QR Code Generator</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-box">
          <div className="gen">
            <input
              type="text"
              value={temp}
              onChange={handleInputChange}
              placeholder="Enter URL to encode"
            />
            <button type="submit" className="button">Generate</button>
          </div>
          <div className="extra">
            <h5>Background Color:</h5>
            <input
              type="color"
              onChange={(e) => { setBgColor(e.target.value.substring(1)) }}
            />
            <h5>Dimension:</h5>
            <input
              type="range"
              min="200"
              max="600"
              value={size}
              onChange={(e) => { setSize(e.target.value) }}
            />
          </div>
        </div>
      </form>
      <div className="output-box">
        <img src={qrCode} alt="" />
        {showDownloadButton && qrCode && ( // Conditionally render the download button
          <button onClick={handleDownload}>Download</button>
        )}
      </div>
    </div>
  );
}

export default App;
