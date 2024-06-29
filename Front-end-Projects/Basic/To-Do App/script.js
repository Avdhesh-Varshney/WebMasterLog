document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addTask(todoInput.value);
        todoInput.value = '';
    });

    function addTask(task) {
        if (task.trim() === '') return;

        const li = document.createElement('li');

        const taskText = document.createElement('p');
        taskText.textContent = task;
        taskText.classList.add('task-text');

        const buttonsContainer = document.createElement('div');
        buttonsContainer.style.display = 'flex';
        buttonsContainer.style.gap = '10px';

        const completeButton = document.createElement('button');
        // completeButton.textContent = 'Complete';
        completeButton.textContent = '✅'
        completeButton.classList.add('complete');
        completeButton.addEventListener('click', () => {
            taskText.classList.toggle('completed-task');
            completeButton.classList.toggle('completed-task');
        });

        const deleteButton = document.createElement('button');
        // deleteButton.textContent = 'Delete';
        deleteButton.textContent = '🗑️'
        deleteButton.classList.add('delete');
        deleteButton.addEventListener('click', () => {
            todoList.removeChild(li);
        });

        buttonsContainer.appendChild(completeButton);
        buttonsContainer.appendChild(deleteButton);

        li.appendChild(taskText);
        li.appendChild(buttonsContainer);
        todoList.appendChild(li);
    }
});
