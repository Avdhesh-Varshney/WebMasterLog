function addTask(columnId) {
  const taskList = document.getElementById(columnId);
  const taskTitle = prompt("Enter task title:");
  if (taskTitle) {
      const task = document.createElement("div");
      task.className = "task";
      task.draggable = true;
      task.textContent = taskTitle;
      task.id = `task-${new Date().getTime()}`;

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "delete-btn";
      deleteBtn.textContent = "X";
      deleteBtn.onclick = () => task.remove();
      task.appendChild(deleteBtn);

      task.addEventListener('dragstart', dragStart);
      task.addEventListener('dragend', dragEnd);

      taskList.appendChild(task);
  }
}

function dragStart(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
  setTimeout(() => {
      event.target.classList.add('hide');
  }, 0);
}

function dragEnd(event) {
  event.target.classList.remove('hide');
}

function dragOver(event) {
  event.preventDefault();
  event.currentTarget.classList.add('dragover');
}

function dragLeave(event) {
  event.currentTarget.classList.remove('dragover');
}

function drop(event) {
  event.preventDefault();
  const id = event.dataTransfer.getData("text/plain");
  const draggable = document.getElementById(id);
  draggable.classList.remove('hide');
  event.currentTarget.classList.remove('dragover');
  event.currentTarget.appendChild(draggable);
  // Show delete button if the task is moved to the "Done" column
  if (event.currentTarget.id === "done-tasks") {
      draggable.querySelector('.delete-btn').style.display = 'block';
  } else {
      draggable.querySelector('.delete-btn').style.display = 'none';
  }
}

document.querySelectorAll('.task-list').forEach(taskList => {
  taskList.addEventListener('dragover', dragOver);
  taskList.addEventListener('dragleave', dragLeave);
  taskList.addEventListener('drop', drop);
});
