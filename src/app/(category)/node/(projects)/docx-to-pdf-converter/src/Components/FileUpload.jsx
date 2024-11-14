import React, { useState } from "react";
import axios from 'axios';

function FileUpload() {
  const [file, setFile] = useState(null);

  function handleFileChange(e) {
    setFile(e.target.files[0]);
  }
  // file upload takes above

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file',file);
    try{
        const response = await axios.post('http://localhost:5000/convert',formData,{
            responseType:'blob'
        }); 
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href=url;
        link.setAttribute('download','converted.pdf');
        document.body.appendChild(link);
        link.click();
        link.remove();

    }
    catch(err){
        console.error('Error uploading file:', err);
    }
  };

  return (
    <div className="text-black ">
      <form onSubmit={handleFileUpload} className="flex w-1/2 mx-auto mt-2 h-[20vh] box-shadow justify-center items-center px-4">
      
          <input
            id="fileInput"
            type="file"
            accept=".docx"
            onChange={handleFileChange}
            className="mr-2 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        <button className="css-button-shadow-border--yellow" type="submit">Upload</button>
      </form>
    </div>
  );
}

export default FileUpload;
