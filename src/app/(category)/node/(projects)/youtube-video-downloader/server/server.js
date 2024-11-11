const express = require('express');
const ytdl = require('ytdl-core');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/download', async (req, res) => {
    try {
        const videoId = req.query.videoId;
        const quality = req.query.quality || '1080p'; // Default quality set to 1080p

        // Validate videoId format
        if (!isValidVideoIdFormat(videoId)) {
            return res.status(400).send('Invalid video ID format');
        }

        const url = `https://www.youtube.com/watch?v=${videoId}`;
        const info = await ytdl.getInfo(url);

        // Check if the requested quality is available
        const availableQualities = ['144p', '240p', '360p', '480p', '720p', '1080p', '1440p'];
        if (!availableQualities.includes(quality)) {
            return res.status(400).send(`Requested quality (${quality}) is not available. Available qualities: ${availableQualities.join(', ')}`);
        }

        // Find the format with the desired quality
        const format = info.formats.find(format => format.qualityLabel === quality);

        res.header('Content-Disposition', 'attachment; filename="video.mp4"');
        ytdl(url, { format }).pipe(res);
    } catch (error) {
        console.error('Error downloading the video:', error);
        res.status(500).send('Error downloading the video');
    }
});



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

function isValidVideoIdFormat(videoId) {
    return /^[a-zA-Z0-9-_]{11}$/.test(videoId);
}
