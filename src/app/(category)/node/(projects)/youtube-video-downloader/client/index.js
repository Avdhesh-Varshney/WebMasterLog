document.querySelector('#downloadBtn').addEventListener('click', handleVideoDownload);

async function handleVideoDownload() {
    const videoLink = document.querySelector('#videoUrl').value;
    const videoQuality = document.querySelector('#quality').value;

    if (!validateYouTubeUrl(videoLink)) {
        alert('Please enter a valid YouTube video URL.');
        return;
    }

    const vidId = getVideoIdFromUrl(videoLink);

    try {
        displayMessage('Downloading...');

        console.log(`Requesting video from: http://localhost:3000/download?videoId=${vidId}&quality=${videoQuality}`);
        const response = await fetch(`http://localhost:3000/download?videoId=${vidId}&quality=${videoQuality}`);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Network response was not ok: ${response.statusText}. Error message: ${errorText}`);
        }

        const videoBlob = await response.blob();
        const downloadUrl = URL.createObjectURL(videoBlob);

        const anchorElement = document.createElement('a');
        anchorElement.style.display = 'none';
        anchorElement.href = downloadUrl;
        anchorElement.download = 'video.mp4';
        document.body.appendChild(anchorElement);
        anchorElement.click();
        URL.revokeObjectURL(downloadUrl);

        displayMessage('Download completed.');
    } catch (error) {
        console.error('Error downloading the video:', error);
        displayMessage('Error downloading the video.');
    }
}

function validateYouTubeUrl(url) {
    const regex = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/i;
    return regex.test(url);
}

function getVideoIdFromUrl(url) {
    let vidId = '';
    const urlSearchParams = new URLSearchParams(new URL(url).search);
    if (url.includes('youtube.com') && urlSearchParams.has('v')) {
        vidId = urlSearchParams.get('v');
    } else if (url.includes('youtu.be')) {
        vidId = new URL(url).pathname.slice(1);
    }

    const idRegex = /^[a-zA-Z0-9-_]{11}$/;
    if (!idRegex.test(vidId)) {
        throw new Error(`Invalid video ID: ${vidId}`);
    }

    return vidId;
}

function displayMessage(msg) {
    const msgDiv = document.querySelector('#message');
    msgDiv.innerText = msg;
}
