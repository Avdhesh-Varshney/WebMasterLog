# Task Reminder Application

## Features

- **Task Management**: Add, edit, and delete tasks.
- **Due Date and Time**: Set deadlines with date and time pickers.
- **Priority Levels**: Assign priority (Low, Medium, High) to tasks.
- **Persistent Storage**: Tasks are saved in local storage for persistence.
- **Responsive Design**: User-friendly interface optimized for various screen sizes.

## Tech Stack

- **HTML**: Structure and content.
- **CSS**: Styling and layout.
- **JavaScript**: Logic and interaction.
- **LocalStorage**: Persistent data storage in the browser.

## How to use

- **Adding Tasks**:
   - Enter a task description in the input field.
   - Use the date picker to select the due date.
   - Use the 24-hour time picker to set the due time.
   - Choose a priority level (Low, Medium, High) from the dropdown.
   - Click the "Add Task" button to add the task to your list.

- **Managing Tasks**:
   - Mark tasks as completed by clicking the checkbox next to each task.
   - Edit tasks by clicking on the task text and entering new text.
   - Delete tasks by clicking the "Delete" button next to each task.

- **Persistence**:
   - Tasks are stored in the browser's local storage, ensuring they remain even after closing the browser.
   - Refreshing the page or reopening the browser will retain your task list.

- **Customization**:
   - Modify `styles.css` to change the look and feel of the application.
   - Extend `script.js` to add more features, such as reminders or notifications.


## Features Implemented:

- Task management (adding, editing, deleting tasks).
- Date and time selection for task deadlines.
- Priority levels for tasks.
- Local storage integration for data persistence.
- Responsive design for different screen sizes.

## Complexity:

- Requires understanding of DOM manipulation in JavaScript.
- Involves handling user input (form data, date/time selection).
- Utilizes local storage for saving and retrieving data.

## Scope:

- Covers fundamental CRUD (Create, Read, Update, Delete) operations.
- Includes handling date and time, which adds complexity beyond basic CRUD applications.
- Provides a user-friendly interface with responsive design considerations.