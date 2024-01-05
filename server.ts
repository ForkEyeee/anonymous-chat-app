const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const httpServer = http.createServer();
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000', // Replace with your frontend URL
    methods: ['GET', 'POST'],
  },
});

io.on('connection', socket => {
  console.log(`User Connected: ${socket.id}`);

  socket.on('join_room', data => {
    socket.join(data);
  });

  socket.on('send_message', data => {
    // console.log(data.room);
    // socket.broadcast.emit('receive_message', data);
    // socket.broadcast.to(data.room).emit('receive_message', data);
    // io.to('room1').emit('receive_message', data);

    socket.to(data.room).emit('receive_message', data);
  });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`);
});
