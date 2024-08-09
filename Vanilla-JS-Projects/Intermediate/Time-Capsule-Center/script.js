document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('timeCapsuleForm');
    const capsuleList = document.getElementById('capsuleList');
    const searchBar = document.getElementById('searchBar');
    const notification = document.getElementById('notification');
    const statisticsContainer = document.getElementById('statisticsContainer');
    let capsules = [];

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const capsuleName = document.getElementById('capsuleName').value;
        const openDate = new Date(document.getElementById('openDate').value);
        const tags = document.getElementById('tags').value.split(',').map(tag => tag.trim());
        const message = document.getElementById('message').value;
        const image = document.getElementById('image').files[0];
        const video = document.getElementById('video').files[0];

        const capsule = {
            name: capsuleName,
            openDate: openDate,
            tags: tags,
            message: message,
            image: image ? URL.createObjectURL(image) : null,
            video: video ? URL.createObjectURL(video) : null,
        };

        capsules.push(capsule);
        updateDashboard();
        updateStatistics();
        showNotification('New capsule added successfully!');
        form.reset();
    });

    searchBar.addEventListener('input', updateDashboard);

    function updateDashboard() {
        capsuleList.innerHTML = '';
        const searchQuery = searchBar.value.toLowerCase();
        const filteredCapsules = capsules.filter(capsule => 
            capsule.name.toLowerCase().includes(searchQuery) ||
            capsule.tags.some(tag => tag.toLowerCase().includes(searchQuery))
        );

        filteredCapsules.forEach((capsule, index) => {
            const capsuleItem = document.createElement('div');
            capsuleItem.classList.add('capsule-item');

            const nameSpan = document.createElement('span');
            nameSpan.textContent = capsule.name;
            capsuleItem.appendChild(nameSpan);

            const dateSpan = document.createElement('span');
            dateSpan.textContent = capsule.openDate.toDateString();
            capsuleItem.appendChild(dateSpan);

            const tagsSpan = document.createElement('span');
            tagsSpan.textContent = capsule.tags.join(', ');
            capsuleItem.appendChild(tagsSpan);

            const countdownSpan = document.createElement('span');
            countdownSpan.id = `countdown${index}`;
            capsuleItem.appendChild(countdownSpan);

            const editButton = document.createElement('button');
            editButton.classList.add('edit-btn');
            editButton.textContent = 'Delete';
            editButton.addEventListener('click', () => editCapsule(index));
            capsuleItem.appendChild(editButton);

            capsuleItem.addEventListener('click', (e) => {
                if (e.target.tagName !== 'BUTTON') {
                    showCapsuleDetails(capsule);
                }
            });

            capsuleList.appendChild(capsuleItem);
            updateCountdown(capsule, index);
        });
    }

    function updateCountdown(capsule, index) {
        const countdownElement = document.getElementById(`countdown${index}`);
        const interval = setInterval(() => {
            const now = new Date();
            const distance = capsule.openDate - now;

            if (distance < 0) {
                clearInterval(interval);
                countdownElement.textContent = 'Available to open';
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }, 1000);
    }

    function showCapsuleDetails(capsule) {
        const modal = document.getElementById('capsuleModal');
        const modalCapsuleName = document.getElementById('modalCapsuleName');
        const modalCapsuleMessage = document.getElementById('modalCapsuleMessage');
        const modalCapsuleImage = document.getElementById('modalCapsuleImage');
        const modalCapsuleVideo = document.getElementById('modalCapsuleVideo');
        const closeBtn = document.querySelector('.close');

        if (new Date() < capsule.openDate) {
            alert('This capsule cannot be opened yet.');
            return;
        }

        modalCapsuleName.textContent = capsule.name;
        modalCapsuleMessage.textContent = capsule.message;

        if (capsule.image) {
            modalCapsuleImage.style.display = 'block';
        } else {
            modalCapsuleImage.style.display = 'none';
        }

        if (capsule.video) {
            modalCapsuleVideo.style.display = 'block';
        } else {
            modalCapsuleVideo.style.display = 'none';
        }

        modal.style.display = 'block';

        closeBtn.onclick = function () {
            modal.style.display = 'none';
        };

        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        };
    }

    function editCapsule(index) {
        const capsule = capsules[index];
        document.getElementById('capsuleName').value = capsule.name;
        document.getElementById('openDate').value = capsule.openDate.toISOString().split('T')[0];
        document.getElementById('tags').value = capsule.tags.join(', ');
        document.getElementById('message').value = capsule.message;
        capsules.splice(index, 1);
        updateDashboard();
        updateStatistics();
    }

    function showNotification(message) {
        notification.textContent = message;
        notification.style.display = 'block';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    }

    function updateStatistics() {
        const totalCapsules = capsules.length;
        const tagCounts = capsules.reduce((acc, capsule) => {
            capsule.tags.forEach(tag => {
                acc[tag] = (acc[tag] || 0) + 1;
            });
            return acc;
        }, {});

        const mostCommonTags = Object.entries(tagCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([tag, count]) => `${tag} (${count})`)
            .join(', ');

        const dateCounts = capsules.reduce((acc, capsule) => {
            const date = capsule.openDate.toDateString();
            acc[date] = (acc[date] || 0) + 1;
            return acc;
        }, {});

        const distribution = Object.entries(dateCounts)
            .map(([date, count]) => `${date}: ${count}`)
            .join('<br>');

        statisticsContainer.innerHTML = '';
        const statsTitle = document.createElement('h3');
        statsTitle.textContent = 'Capsule Statistics';
        statisticsContainer.appendChild(statsTitle);

        const totalCapsulesP = document.createElement('p');
        totalCapsulesP.textContent = `Total Capsules: ${totalCapsules}`;
        statisticsContainer.appendChild(totalCapsulesP);

        const mostCommonTagsP = document.createElement('p');
        mostCommonTagsP.textContent = `Most Common Tags: ${mostCommonTags}`;
        statisticsContainer.appendChild(mostCommonTagsP);

        const distributionP = document.createElement('p');
        distributionP.innerHTML = `Distribution by Opening Date:<br>${distribution}`;
        statisticsContainer.appendChild(distributionP);
    }

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function () {
            document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
            document.querySelector(this.getAttribute('href')).classList.add('active');
        });
    });

    document.getElementById('addCapsule').classList.add('active');
});