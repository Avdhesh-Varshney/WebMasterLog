const app = require('express')();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
  cors: { origin: '*' }
});

const port = process.env.PORT || 3000;

// This will store the colors based on user IDs
let userColors = {};  
// This will store the active users by their socket IDs
let activeUsers = {};  

// Function to generate random pastel colors
function generateRandomPastelColor() {
  const red = Math.floor(Math.random() * 128 + 127);   // Light red (range from 127 to 255)
  const green = Math.floor(Math.random() * 128 + 127); // Light green (range from 127 to 255)
  const blue = Math.floor(Math.random() * 128 + 127);  // Light blue (range from 127 to 255)

  return `rgb(${red}, ${green}, ${blue})`; // Return RGB format
}

io.on('connection', (socket) => {
  //console.log('a user connected');

  // Listen for 'set-username' event from Angular, passing user ID
  socket.on('set-username', (userId) => {
    //console.log(`User with ID ${userId} connected`);

    // Store the active user with their socket ID
    activeUsers[socket.id] = userId;
    //console.log(activeUsers);
    
    // If the user doesn't already have a color assigned, generate one
    if (!userColors[userId]) {
      userColors[userId] = generateRandomPastelColor();
    }

    // Send the assigned color back to the client
    io.emit('set-color', { userId, color: userColors[userId] });

    const connectedUserIds = Object.values(activeUsers);
    io.emit('connected-users', connectedUserIds);
  });

  // Handle incoming messages
  socket.on('message', (message) => {
    // Add color to the message based on the user ID
    message.color = userColors[message.userId];

    //console.log(message);

    // Emit the message to all clients
    io.emit('message', message);
  });

  
  socket.on('disconnect', () => {
    const userId = activeUsers[socket.id]; // Get the user ID based on socket ID
    //console.log(`User with ID ${userId} disconnected!`);

    // Remove the user from the activeUsers object
    delete activeUsers[socket.id];

    const connectedUserIds = Object.values(activeUsers);
    io.emit('connected-users', connectedUserIds);
  });
});

httpServer.listen(port, () => console.log(`listening on port ${port}`));
