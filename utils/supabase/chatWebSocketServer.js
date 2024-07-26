const { WebSocketServer } = require('ws');
const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('message', (message) => {
        console.log('Received message:', message);
        // Handle the received message here
    });

    socket.on('close', () => {
        console.log('Client disconnected');
        // Handle client disconnection here
    });
});