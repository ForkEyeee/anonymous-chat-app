const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const httpServer = http.createServer();

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000', // Replace with your frontend URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
});

io.on('connection', socket => {
  socket.emit('hello', 'A user connected: ' + socket.id);
  socket.on('disconnect', reason => {
    console.log('A user disconnected: ' + socket.id + ' ' + reason);
  });
});

io.on('connection', socket => {
  socket.on('test', msg => {
    console.log('message: ' + msg);
  });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`);
});
