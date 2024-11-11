document.addEventListener('DOMContentLoaded', () => {
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskInput = document.getElementById('task');
    const dueDateInput = document.getElementById('dueDate');
    const dueTimeInput = document.getElementById('dueTime');
    const priorityInput = document.getElementById('priority');
    const taskList = document.getElementById('taskList');

    // Load tasks from local storage
    loadTasks();

    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        const dueDate = dueDateInput.value;
        const dueTime = dueTimeInput.value;
        const priority = priorityInput.value;
        if (taskText && dueDate && dueTime && priority) {
            const task = {
                text: taskText,
                dueDateTime: new Date(`${dueDate}T${dueTime}`).toISOString(),
                priority,
                completed: false
            };
            addTask(task);
            saveTask(task);
            taskInput.value = '';
            dueDateInput.value = '';
            dueTimeInput.value = '';
            priorityInput.value = 'Low';
        }
    });

    taskList.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const taskItem = e.target.parentElement;
            const taskText = taskItem.querySelector('.task-text').textContent;
            taskList.removeChild(taskItem);
            removeTask(taskText);
        } else if (e.target.tagName === 'INPUT') {
            const taskItem = e.target.parentElement;
            const taskText = taskItem.querySelector('.task-text').textContent;
            const tasks = getTasks();
            const task = tasks.find(task => task.text === taskText);
            task.completed = e.target.checked;
            taskItem.querySelector('.task-text').style.textDecoration = task.completed ? 'line-through' : 'none';
            localStorage.setItem('tasks', JSON.stringify(tasks));
        } else if (e.target.tagName === 'P') {
            editTask(e.target);
        }
    });

    function addTask(task) {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';

        const taskPara = document.createElement('p');
        taskPara.className = 'task-text';
        taskPara.textContent = task.text;

        const dueDatePara = document.createElement('p');
        dueDatePara.className = 'task-due-date';
        dueDatePara.textContent = new Date(task.dueDateTime).toLocaleString();

        const priorityPara = document.createElement('p');
        priorityPara.className = 'task-priority';
        priorityPara.textContent = task.priority;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';

        taskItem.appendChild(taskPara);
        taskItem.appendChild(dueDatePara);
        taskItem.appendChild(priorityPara);
        taskItem.appendChild(deleteBtn);
        taskList.appendChild(taskItem);
    }

    function saveTask(task) {
        const tasks = getTasks();
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = getTasks();
        tasks.forEach(task => addTask(task));
    }

    function removeTask(taskText) {
        let tasks = getTasks();
        tasks = tasks.filter(task => task.text !== taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function editTask(taskElement) {
        const newTaskText = prompt('Edit task:', taskElement.textContent);
        if (newTaskText !== null) {
            const oldTaskText = taskElement.textContent;
            taskElement.textContent = newTaskText;
            updateTask(oldTaskText, newTaskText);
        }
    }

    function updateTask(oldTaskText, newTaskText) {
        let tasks = getTasks();
        const taskIndex = tasks.findIndex(task => task.text === oldTaskText);
        if (taskIndex > -1) {
            tasks[taskIndex].text = newTaskText;
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }

    function getTasks() {
        return JSON.parse(localStorage.getItem('tasks')) || [];
    }
});
