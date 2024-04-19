const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { v4: uuidv4 } = require('uuid'); // Import uuid package to generate unique IDs

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Handle socket connections
io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle 'createRoom' event
    socket.on('createRoom', () => {
        const roomId = uuidv4(); // Generate a random room ID using uuid
        socket.emit('roomId', roomId); // Send the generated room ID back to the client
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
