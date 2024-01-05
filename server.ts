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
  // console.log('A user connected:', socket.id);
  socket.on('join', roomId => {
    socket.join(roomId);
    console.log(`user with id-${socket.id} joined room - ${roomId}`);
    console.log(socket.rooms);
    console.log(io.sockets.adapter.rooms.get(roomId));
  });

  socket.on('chat message', data => {
    console.log(data, 'DATA');
    //This will send a message to a specific room ID
    // socket.to(data.room).emit('receive message', data.msg);
    io.sockets.in('l2RzT7jKqFcbKbRnAAHb').emit('receive message', data.msg);
  });

  socket.on('disconnect', reason => {
    // console.log('A user disconnected: ' + socket.id + ' ' + reason);
  });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`);
});
