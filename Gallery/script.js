const imageContainer = document.getElementById('imageContainer');

function createElements(data) {
    data.forEach(item => {
        const link = document.createElement('a');
        link.href = item.videoURL;
        link.target = '_blank';
        const imageDiv = document.createElement('div');
        imageDiv.classList = 'image';
        imageDiv.style.backgroundImage = `url('${item.imageURL}')`;
        link.appendChild(imageDiv);
        imageContainer.appendChild(link);
    });
}

fetch('./data.json')
    .then(response => response.json())
    .then(data => createElements(data))
    .catch(error => {
        console.error('Error fetching data:', error);
    });
