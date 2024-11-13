// Add Entry
document.getElementById('entryForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const date = document.getElementById('date').value;
    const mood = document.getElementById('mood').value;
    const content = document.getElementById('content').value;

    const entry = { title, date, mood, content };
    saveEntry(entry);
    window.location.href = 'entries.html';
});

function saveEntry(entry) {
    let entries = JSON.parse(localStorage.getItem('entries')) || [];
    entries.push(entry);
    localStorage.setItem('entries', JSON.stringify(entries));
}

// View Entries
document.addEventListener('DOMContentLoaded', function() {
    const entriesList = document.getElementById('entriesList');
    if (entriesList) {
        displayEntries();
    }
});

function displayEntries() {
    let entries = JSON.parse(localStorage.getItem('entries')) || [];
    const entriesList = document.getElementById('entriesList');

    if (entries.length === 0) {
        entriesList.innerHTML = '<p>No entries found.</p>';
    } else {
        entriesList.innerHTML = '';
        entries.forEach(function(entry, index) {
            const entryDiv = document.createElement('div');
            entryDiv.classList.add('entry');
            entryDiv.innerHTML = `
                <h3>${entry.title}</h3>
                <p><strong>Date:</strong> ${entry.date}</p>
                <p><strong>Mood:</strong> ${entry.mood}</p>
                <p>${entry.content.substring(0, 100)}...</p>
                <a href="entry.html?id=${index}">Read More</a>
            `;
            entriesList.appendChild(entryDiv);
        });
    }
}

// Entry Details
document.addEventListener('DOMContentLoaded', function() {
    const entryContent = document.getElementById('entryContent');
    const deleteEntryBtn = document.getElementById('deleteEntry');
    
    if (entryContent) {
        const params = new URLSearchParams(window.location.search);
        const entryId = parseInt(params.get('id'));
        if (!isNaN(entryId)) {
            const entries = JSON.parse(localStorage.getItem('entries')) || [];
            const entry = entries[entryId];
            
            if (entry) {
                entryContent.innerHTML = `
                    <h3>${entry.title}</h3>
                    <p><strong>Date:</strong> ${entry.date}</p>
                    <p><strong>Mood:</strong> ${entry.mood}</p>
                    <p>${entry.content}</p>
                `;
                
                deleteEntryBtn.addEventListener('click', function() {
                    deleteEntry(entryId);
                    window.location.href = 'entries.html';
                });
            } else {
                entryContent.innerHTML = '<p>Entry not found.</p>';
            }
        } else {
            entryContent.innerHTML = '<p>Invalid entry ID.</p>';
        }
    }
});

// Delete Entry
function deleteEntry(entryId) {
    let entries = JSON.parse(localStorage.getItem('entries')) || [];
    entries.splice(entryId, 1);
    localStorage.setItem('entries', JSON.stringify(entries));
}

// View Entries
document.addEventListener('DOMContentLoaded', function() {
    const entriesList = document.getElementById('entriesList');
    if (entriesList) {
        displayEntries();
    }
});

function displayEntries() {
    let entries = JSON.parse(localStorage.getItem('entries')) || [];
    const entriesList = document.getElementById('entriesList');

    if (entries.length === 0) {
        entriesList.innerHTML = '<p>No entries found.</p>';
    } else {
        entriesList.innerHTML = '';
        entries.forEach(function(entry, index) {
            const entryDiv = document.createElement('div');
            entryDiv.classList.add('entry');
            entryDiv.innerHTML = `
                <h3>${entry.title}</h3>
                <p><strong>Date:</strong> ${entry.date}</p>
                <p><strong>Mood:</strong> ${entry.mood}</p>
                <p>${entry.content.substring(0, 100)}...</p>
                <a href="entry.html?id=${index}">Read More</a>
            `;
            entriesList.appendChild(entryDiv);
        });
    }
}
