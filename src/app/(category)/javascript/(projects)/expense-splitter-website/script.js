let participants = [];
let expenses = [];

function setupParticipants() {
    const numParticipants = document.getElementById('numParticipants').value;
    const participantNames = document.getElementById('participantNames');
    participantNames.innerHTML = '';

    for (let i = 0; i < numParticipants; i++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = `Participant ${i + 1} Name`;
        input.className = 'participantName';
        participantNames.appendChild(input);
    }

    const button = document.createElement('button');
    button.textContent = 'Add Participants';
    button.onclick = addParticipants;
    participantNames.appendChild(button);
}

function addParticipants() {
    const nameInputs = document.querySelectorAll('.participantName');
    nameInputs.forEach(input => {
        if (input.value) participants.push(input.value);
    });

    if (participants.length) {
        document.getElementById('setup').style.display = 'none';
        document.getElementById('addExpenses').style.display = 'block';
        updatePaidBySelect();
    }
}

function updatePaidBySelect() {
    const expensePaidBy = document.getElementById('expensePaidBy');
    expensePaidBy.innerHTML = '';

    participants.forEach(participant => {
        const option = document.createElement('option');
        option.textContent = participant;
        expensePaidBy.appendChild(option);
    });
}

function addExpense() {
    const description = document.getElementById('expenseDescription').value;
    const amount = parseFloat(document.getElementById('expenseAmount').value);
    const paidBy = document.getElementById('expensePaidBy').value;

    if (description && amount && paidBy) {
        expenses.push({ description, amount, paidBy });
        updateExpensesList();
        document.getElementById('expenseDescription').value = '';
        document.getElementById('expenseAmount').value = '';
    }
}

function updateExpensesList() {
    const expensesList = document.getElementById('expensesList');
    expensesList.innerHTML = '';

    expenses.forEach(expense => {
        const li = document.createElement('li');
        li.textContent = `${expense.description}: $${expense.amount.toFixed(2)} (Paid by ${expense.paidBy})`;
        expensesList.appendChild(li);
    });
}

function showBill() {
    const fileInput = document.getElementById('uploadBill');
    const billContainer = document.getElementById('billContainer');
    billContainer.innerHTML = '';

    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            billContainer.appendChild(img);
        };
        reader.readAsDataURL(fileInput.files[0]);
    }
}

function calculateSplit() {
    const resultsList = document.getElementById('resultsList');
    resultsList.innerHTML = '';

    const balance = {};
    participants.forEach(participant => balance[participant] = 0);

    expenses.forEach(expense => {
        const splitAmount = expense.amount / participants.length;
        participants.forEach(participant => balance[participant] -= splitAmount);
        balance[expense.paidBy] += expense.amount;
    });

    participants.forEach(participant => {
        const li = document.createElement('li');
        li.textContent = `${participant} ${balance[participant] >= 0 ? 'is owed' : 'owes'} $${Math.abs(balance[participant]).toFixed(2)}`;
        resultsList.appendChild(li);
    });

    document.getElementById('results').style.display = 'block';
}