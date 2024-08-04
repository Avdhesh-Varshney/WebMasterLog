import React, { useState } from "react";
import "./UploadPage.css";
import CloseIcon from "@material-ui/icons/Close";
import UploadVideoForm from './UploadVideoForm'
import Axios from "axios";

const UploadPage: React.FC = () => {
  const [fileSelected, setFileSelected] = useState(false);
  
  const uploadVideo = (files: any) => {
    const formData = new FormData()
    formData.append('video', files[0])
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }

    Axios.post('http://localhost:3001/upload/video', formData, config).then((response)=> {
      console.log("Video Uploaded Correctly")
    }).catch((err)=> {
      console.log(err)
    })
  }

  return (
    <div className="UploadPage">
      <div className="SelectFileContainer">
            <div className="topSection">
              <div className="leftSide">
                <h2>Upload Video</h2>
              </div>
              <div className="rightSide">
                <CloseIcon id="closeIcon" />
              </div>
            </div>
            <div className="body" id={fileSelected ? "Selected" : ""}>
            {!fileSelected ? (
              <>
              <h4>Upload A Video From Your Computer</h4>
              <input
                type="file"
                id="uploadInput"
                accept="video/mp4"
                style={{ display: "none" }}
                onChange={(e) => {uploadVideo(e.target.files)}}
              />
              <div id="uploadButton">
                <label htmlFor="uploadInput">SELECT FILE</label>
              </div>
              </>
              ) : (
                <UploadVideoForm />
              )}
            </div>
        
      </div>
    </div>
  );
};

export default UploadPage;
