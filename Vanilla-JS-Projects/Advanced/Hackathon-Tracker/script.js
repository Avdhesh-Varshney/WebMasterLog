const hackathons = [];
let editMode = false;
let currentCard = null;

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const registrationDate = document.getElementById('registration-date').value;
    const deadline = document.getElementById('deadline').value;
    const status = document.getElementById('status').value;

    if (editMode) {
        updateHackathonCard(currentCard, name, registrationDate, deadline, status);
        editMode = false;
        currentCard = null;
    } else {
        const card = createHackathonCard(name, registrationDate, deadline, status);
        addCardToCategory(card, status);
        hackathons.push({ name, registrationDate, deadline, status });
        updateCalendar();
    }

    this.reset();
});
function escapeHTML(str) {
    return str.replace(/[&<>"']/g, function(match) {
        const escapeMap = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        };
        return escapeMap[match];
    });
}
function createHackathonCard(name, registrationDate, deadline, status) {
    const card = document.createElement('div');
    card.className = 'hackathon-card';
    card.innerHTML = `
        <h3>${name}</h3>
        <p>Registration Date: ${registrationDate}</p>
        <p>Deadline: ${deadline}</p>
        <p class="status">Status: ${status}</p>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
    `;
    card.querySelector('.edit-btn').addEventListener('click', () => {
        populateFormForEdit(name, registrationDate, deadline, status);
        editMode = true;
        currentCard = card;
    });
    card.querySelector('.delete-btn').addEventListener('click', () => {
        const parentCategory = card.parentElement;
        parentCategory.removeChild(card);
        const index = hackathons.findIndex(h => h.name === name && h.deadline === deadline);
        if (index > -1) {
            hackathons.splice(index, 1);
            updateCalendar();
        }
    });
    return card;
}

function updateHackathonCard(card, name, registrationDate, deadline, status) {
    const oldStatus = card.querySelector('.status').textContent.split(': ')[1];
    card.querySelector('h3').textContent = name;
    card.querySelector('p:nth-of-type(1)').textContent = `Registration Date: ${registrationDate}`;
    card.querySelector('p:nth-of-type(2)').textContent = `Deadline: ${deadline}`;
    card.querySelector('.status').textContent = `Status: ${status}`;

    const index = hackathons.findIndex(h => h.name === name && h.deadline === deadline);
    if (index > -1) {
        hackathons[index] = { name, registrationDate, deadline, status };
        updateCalendar();
    }

    if (oldStatus !== status) {
        card.parentElement.removeChild(card);
        addCardToCategory(card, status);
    }
}

function addCardToCategory(card, status) {
    const category = document.getElementById(status);
    const dashboard = category.querySelector('.hackathon-dashboard');
    dashboard.appendChild(card);
    toggleCategoryHeadings();
}

function toggleCategoryHeadings() {
    const statuses = ['in-progress', 'submitted', 'completed'];
    statuses.forEach(status => {
        const category = document.getElementById(status);
        const dashboard = category.querySelector('.hackathon-dashboard');
        const heading = category.querySelector('h2');
        if (dashboard.children.length > 0) {
            heading.style.display = 'block';
        } else {
            heading.style.display = 'none';
        }
    });
}

toggleCategoryHeadings();

function populateFormForEdit(name, registrationDate, deadline, status) {
    document.getElementById('name').value = name;
    document.getElementById('registration-date').value = registrationDate;
    document.getElementById('deadline').value = deadline;
    document.getElementById('status').value = status;
}

const statusColors = {
    'completed': 'blue',
    'in-progress': 'red',
    'submitted': 'green'
};

function updateCalendar() {
    const events = hackathons.map(hackathon => {
        const color = statusColors[hackathon.status] || 'black';
        console.log(`Hackathon: ${hackathon.name}, Status: ${hackathon.status}, Color: ${color}`);
        return {
            title: `${hackathon.name} (${hackathon.status})`,
            start: hackathon.deadline,
            end: hackathon.deadline,
            color: color
        };
    });

    $('#calendar').fullCalendar('removeEvents');
    $('#calendar').fullCalendar('addEventSource', events);
}

$(document).ready(function() {
    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        editable: true,
        eventLimit: true
    });
});

$(document).ready(function() {
    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        editable: false,
        events: []
    });
});