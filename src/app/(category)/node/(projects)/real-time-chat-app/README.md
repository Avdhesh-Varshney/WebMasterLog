# BaatCheet - Real-Time Chat Application

BaatCheet is a modern, real-time chat application designed for seamless communication between users. Built with Node.js, Express, Socket.IO, and MongoDB, it offers a secure and interactive messaging platform with a responsive user interface powered by Tailwind CSS and DaisyUI.

---

## Features
- **Real-Time Messaging**: Instant communication with live updates using WebSockets.
- **Secure Authentication**: JWT-based user authentication and session management.
- **Cloud Storage**: Integrates Cloudinary for handling media uploads.
- **Responsive Design**: Optimized for all devices with a clean and modern UI.
- **Database Management**: Scalable and efficient storage using MongoDB.

---

## Tech Stack

### Backend
- **Node.js**
- **Express.js**
- **Socket.IO**
- **MongoDB**

### Frontend
- **Tailwind CSS**
- **DaisyUI**

### Other Tools
- **Cloudinary** for media storage
- **JWT** for secure token-based authentication

---

## Getting Started

### Prerequisites
Make sure you have the following installed:
- **Node.js** (v14+ recommended)
- **MongoDB**
- **Cloudinary Account** (for media uploads)

---

### Installation
```bash
1. Clone the repository:
   
git clone <REPO_URL>
cd BaatCheet


2. Install dependencies:

bash
Copy code
npm install


3.Create a .env file in the root directory and add the following variables:

env
Copy code
MONGODB_URI=your_mongodb_connection_string
PORT=your_preferred_port
JWT_SECRET=your_jwt_secret
NODE_ENV=development
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret


4.Start the server:

bash
Copy code
npm start
Open the application in your browser at http://localhost:<PORT>.
