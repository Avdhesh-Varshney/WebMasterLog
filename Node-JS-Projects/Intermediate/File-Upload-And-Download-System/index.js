const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3000;

// Local Multer storage
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

app.set('view engine', 'ejs');
app.use(express.static('public'));

// Serve the upload interface
app.get('/', (req, res) => {
    res.render('index');
});

//file upload
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    res.send(`
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Upload Success</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f0f0f0;
              margin: 0;
              padding: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
            }
      
            .message-container {
              background: #fff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              text-align: center;
              width: 400px;
            }
      
            h2 {
              color: #e8b274;
              margin-bottom: 15px;
            }
      
            a {
              display: inline-block;
              margin-top: 10px;
              text-decoration: none;
              color: #2196F3;
              font-weight: bold;
              transition: color 0.3s;
            }
      
            a:hover {
              color: #0b7dda;
            }
      
            button {
              margin-top: 20px;
              padding: 10px 15px;
              background-color: #e8b274;
              color: white;
              border: none;
              border-radius: 5px;
              cursor: pointer;
              transition: background-color 0.3s;
            }
      
            button:hover {
              background-color: #e8b274;
            }
          </style>
        </head>
        <body>
          <div class="message-container">
            <h2>File Uploaded Successfully!</h2>
            <a href="/download/${req.file.filename}">Download ${req.file.originalname}</a>
            <br />
            <button onclick="window.history.back()">Upload Another File</button>
          </div>
        </body>
        </html>
      `);

});

//file download
app.get('/download/:filename', (req, res) => {
    const filePath = path.join(__dirname, 'uploads', req.params.filename);
    res.download(filePath);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
