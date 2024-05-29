async function fetchImages() {
    const query = document.getElementById('searchQuery').value;
    const apiKey = 'OwgLT82Rk5Yhcn7p0Lmt7TkgmtVfU0mDKMDm5ra3'; 
    const url = `https://images-api.nasa.gov/search?q=${query}&media_type=image`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const items = data.collection.items;
        displayImages(items);
    } catch (error) {
        console.error('Error fetching images:', error);
    }
}

function displayImages(items) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';  // Clear previous results

    if (items.length === 0) {
        gallery.innerHTML = '<p>No images found.</p>';
        return;
    }

    items.forEach(item => {
        const links = item.links;
        if (links && links.length > 0) {
            const imageUrl = links[0].href;
            const imageContainer = document.createElement('div');
            imageContainer.className = 'image-container';
            imageContainer.innerHTML = `<img src="${imageUrl}" alt="NASA Image">`;
            gallery.appendChild(imageContainer);
        }
    });
}
