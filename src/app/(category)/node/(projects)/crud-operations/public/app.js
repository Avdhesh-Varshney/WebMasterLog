document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('itemForm');
    const itemsList = document.getElementById('itemsList');
    const itemIdInput = document.getElementById('itemId');

    // Fetch items
    fetch('/api/items')
        .then(response => response.json())
        .then(items => {
            items.forEach(item => {
                addItemToDOM(item);
            });
        });

    // Add or Update item
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;
        const id = itemIdInput.value;

        if (id) {
            // Update item
            fetch(`/api/items/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, description })
            })
            .then(response => response.json())
            .then(item => {
                updateItemInDOM(item);
                form.reset();
                itemIdInput.value = '';
                form.querySelector('button').textContent = 'Add Item';
            });
        } else {
            // Add item
            fetch('/api/items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, description })
            })
            .then(response => response.json())
            .then(item => {
                addItemToDOM(item);
                form.reset();
            });
        }
    });

    // Add item to DOM
    function addItemToDOM(item) {
        const li = document.createElement('li');
        li.setAttribute('data-id', item.id);
        li.innerHTML = `
            ${item.name} - ${item.description}
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        `;
        itemsList.appendChild(li);
    }

    // Update item in DOM
    function updateItemInDOM(item) {
        const li = document.querySelector(`li[data-id="${item.id}"]`);
        li.innerHTML = `
            ${item.name} - ${item.description}
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        `;
    }

    // Handle edit and delete buttons
    itemsList.addEventListener('click', (e) => {
        const id = e.target.parentElement.getAttribute('data-id');
        if (e.target.classList.contains('delete-btn')) {
            fetch(`/api/items/${id}`, {
                method: 'DELETE'
            })
            .then(() => {
                e.target.parentElement.remove();
            });
        }

        if (e.target.classList.contains('edit-btn')) {
            const li = e.target.parentElement;
            const name = li.firstChild.textContent.split(' - ')[0];
            const description = li.firstChild.textContent.split(' - ')[1];
            document.getElementById('name').value = name;
            document.getElementById('description').value = description;
            itemIdInput.value = id;
            form.querySelector('button').textContent = 'Update Item';
        }
    });
});
