document.addEventListener('DOMContentLoaded', () => {
    const passwordForm = document.getElementById('passwordForm');
    const passwordList = document.getElementById('passwordList');

    passwordForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const site = document.getElementById('site').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        savePassword(site, username, password);
        displayPasswords();
        
        passwordForm.reset();
    });

    const savePassword = (site, username, password) => {
        const passwords = JSON.parse(localStorage.getItem('passwords')) || [];
        passwords.push({ site, username, password });
        localStorage.setItem('passwords', JSON.stringify(passwords));
    };

    const displayPasswords = () => {
        const passwords = JSON.parse(localStorage.getItem('passwords')) || [];
        passwordList.innerHTML = '';
        passwords.forEach(({ site, username, password }, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div><strong>Site:</strong> ${site}</div>
                <div><strong>Username:</strong> ${username}</div>
                <div><strong>Password:</strong> ${password}</div>
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;
            passwordList.appendChild(li);
        });
        attachDeleteEventListeners();
    };

    const attachDeleteEventListeners = () => {
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                deletePassword(index);
            });
        });
    };

    const deletePassword = (index) => {
        const passwords = JSON.parse(localStorage.getItem('passwords')) || [];
        passwords.splice(index, 1);
        localStorage.setItem('passwords', JSON.stringify(passwords));
        displayPasswords();
    };

    displayPasswords();
});
