// Get the DOM elements
const imageUpload = document.getElementById('imageUpload');
const topTextInput = document.getElementById('topText');
const bottomTextInput = document.getElementById('bottomText');
const topTextSizeInput = document.getElementById('topTextSize');
const bottomTextSizeInput = document.getElementById('bottomTextSize');
const memeCanvas = document.getElementById('memeCanvas');
const ctx = memeCanvas.getContext('2d');
const generateMemeButton = document.getElementById('generateMeme');
const downloadMemeButton = document.getElementById('downloadMeme');

// Set canvas default dimensions
memeCanvas.width = 500;
memeCanvas.height = 400;

let image;

// Event listener for image upload
imageUpload.addEventListener('change', (e) => {
    const reader = new FileReader();
    reader.onload = () => {
        image = new Image();
        image.src = reader.result;
        image.onload = () => {
            drawMeme();
        };
    };
    reader.readAsDataURL(e.target.files[0]);
});

// Event listeners for text and size inputs
topTextInput.addEventListener('input', drawMeme);
bottomTextInput.addEventListener('input', drawMeme);
topTextSizeInput.addEventListener('input', drawMeme);
bottomTextSizeInput.addEventListener('input', drawMeme);
generateMemeButton.addEventListener('click', drawMeme);

// Function to draw meme
function drawMeme() {
    // Clear canvas
    ctx.clearRect(0, 0, memeCanvas.width, memeCanvas.height);

    // Draw image
    if (image) {
        ctx.drawImage(image, 0, 0, memeCanvas.width, memeCanvas.height);
    }

    // Set top text style
    ctx.font = `${topTextSizeInput.value}px Arial`;
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 4;
    ctx.textAlign = 'center';

    // Draw top text
    ctx.strokeText(topTextInput.value, memeCanvas.width / 2, 50);
    ctx.fillText(topTextInput.value, memeCanvas.width / 2, 50);

    // Set bottom text style
    ctx.font = `${bottomTextSizeInput.value}px Arial`;

    // Draw bottom text
    ctx.strokeText(bottomTextInput.value, memeCanvas.width / 2, memeCanvas.height - 30);
    ctx.fillText(bottomTextInput.value, memeCanvas.width / 2, memeCanvas.height - 30);

    // Enable the download button after meme is created
    downloadMemeButton.classList.remove('disabled');
    downloadMemeButton.disabled = false;
}

// Event listener to download the meme
downloadMemeButton.addEventListener('click', () => {
    // Create a temporary link element
    const link = document.createElement('a');
    link.download = 'meme.png';
    link.href = memeCanvas.toDataURL();
    
    // Trigger the download
    link.click();
});
