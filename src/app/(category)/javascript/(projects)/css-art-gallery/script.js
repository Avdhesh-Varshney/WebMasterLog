fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const dataButtons = document.querySelectorAll('.data-btn');
        dataButtons.forEach(button => {
            button.addEventListener('click', () => {
                const image = button.previousElementSibling;
                const imageUrl = image.src;
                const imageData = data.find(item => item.imageUrl === imageUrl);

                if (imageData) {
                    document.getElementById('overlay-title').textContent = imageData.title;
                    document.getElementById('overlay-description').textContent = imageData.artist;
                    document.getElementById('overlay-link').href = imageData.link;
                    document.getElementById('overlay').style.display = 'flex';
                }
            });
        });

        document.getElementById('close-overlay').addEventListener('click', function() {
            document.getElementById('overlay').style.display = 'none';
        });
    })
    .catch(error => console.error('Error loading JSON:', error));
