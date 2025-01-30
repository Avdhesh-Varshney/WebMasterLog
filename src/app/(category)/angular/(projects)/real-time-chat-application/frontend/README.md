<h1 align='center'><b>💥 REAL TIME CHAT APP💥</b></h1>

<!-- -------------------------------------------------------------------------------------------------------------- -->

<h3 align='center'>Tech Stack Used 🎮</h3>
<!-- enlist all the technologies used to create this project from them (Remove comment using 'ctrl+z' or 'command+z') -->

<div align='center'>
  <img src="https://img.shields.io/badge/HTML5-orange?style=for-the-badge&logo=html5&logoColor=white" />
  <img src="https://img.shields.io/badge/angular-purple?style=for-the-badge&logo=angular&logoColor=white" />
  <img src="https://img.shields.io/badge/scss-blue?style=for-the-badge&logo=css&logoColor=white" />
  <img src="https://img.shields.io/badge/typescipt-darkblue?style=for-the-badge&logo=typescript&logoColor=white)" />
  <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
</div>

![Line](https://github.com/Avdhesh-Varshney/WebMasterLog/assets/114330097/4b78510f-a941-45f8-a9d5-80ed0705e847)

<!-- -------------------------------------------------------------------------------------------------------------- -->

## :zap: Description 📃

- A real time chat application that utilizes Angular and Socket.io to allow users interact in real time. Users can sign up and log in to start chatting. Each user is dynamically assigned an avatar. User can see online and offline group members in real time!.

<!-- -------------------------------------------------------------------------------------------------------------- -->

## :zap: How to run it? 🕹️
## Project Structure

The project is organized into two main directories:

*   **frontend:** Contains the Angular application.
*   **backend:** Contains the backend server setup using Node.js, a proxy server (`db.json`), and the main application logic (`index.js`).

## Backend Setup (Node.js and JSON Server)

This section describes how to set up the backend server.

1.  **Fork and Clone:** Fork the repository and then clone it to your local machine:

    ```bash
    git clone repository-url
    ```

2.  **Navigate to Backend Directory:**

    ```bash
    cd backend
    ```

3.  **Install Dependencies:** Install the required Node.js dependencies:

    ```bash
    npm install
    ```

4.  **Install JSON Server (if not already installed):**

    ```bash
    npm install -g json-server
    ```

5.  **Start JSON Server:** This will serve as a mock backend for user data.

    ```bash
    npx json-server --watch db.json
    ```

    The JSON Server will start a REST API server, typically at `http://localhost:8000`.  The specific URL will be displayed in the terminal. This application uses `http://localhost:8000/users` as the default endpoint.


6.  **Start the Node.js Server:**  This server handles the Socket.io connections for real-time communication.
    ```bash
    node index.js
    ```
    This will start a Socket.IO server, the port will be displayed in the console. This application uses port 3000.


## Frontend Setup (Angular)

1.  **Navigate to Frontend Directory:** Open a new terminal and navigate to the frontend directory:

    ```bash
    cd frontend
    ```

2.  **Install Dependencies:**

    ```bash
    npm install
    ```

3.  **Serve the Application:**

    ```bash
    ng serve
    ```

4.  **Access the Application:** Open a web browser and go to `http://localhost:4200/` (or the URL shown in your terminal) to access the chat application.

<!-- -------------------------------------------------------------------------------------------------------------- -->

## :zap: Screenshot 📸

<img src="../screenshot.webp">


<!-- -------------------------------------------------------------------------------------------------------------- -->

<h4 align='center'>Developed By <b><i>Nikita Dey</i></b> 👩</h4>
<p align='center'>
  <a href='https://www.linkedin.com/in/nikita-dey-4999ba1b2/'>
    <img src='https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white' />
  </a>
  <a href='https://github.com/DeyNik'>
    <img src='https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white' />
  </a>
</p>

<h4 align='center'>Happy Coding 🧑‍💻</h4>

<h3 align="center">Show some &nbsp;❤️&nbsp; by &nbsp;🌟&nbsp; this repository!</h3>
