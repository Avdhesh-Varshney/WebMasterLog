import React from 'react'
import './UploadPage.css'
import Axios from 'axios'
const UploadVideoForm: React.FC = () => {

    const uploadThumbnail = (file: any) => {
        const formData = new FormData()
        formData.append("file", file[0])
        formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET as string)
        Axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`, formData).then((response)=> {
            console.log(response)
        })
    }

    return (
        <div className="UploadVideoContainer">
            <div className="titleContainer">
                <label>Title:</label>
                <input type="text" placeholder="Title..." />
            </div>

            <div className="descriptionContainer">
                <label>Description:</label>
                <textarea  placeholder="Description..." />
            </div>
            <div className="bottomSection">
                <div className="thumbnailContainer">
                    <input
                    type="file"
                    id="uploadThumbnail"
                    style={{ display: "none" }}
                    onChange={(e) => uploadThumbnail(e.target.files)}
                    />
                    <div id="uploadThumbnail">
                        <label htmlFor="uploadThumbnail"> - Select - </label>
                    </div>
                </div>
                <div className="uploadButtonContainer">
                    <button> Upload Video</button>
                </div>
            </div>
        </div>
    )
}

export default UploadVideoForm
