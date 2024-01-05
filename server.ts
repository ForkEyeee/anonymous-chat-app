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
    const roomSize =
      io.sockets.adapter.rooms.get(data) === undefined
        ? null
        : io.sockets.adapter.rooms.get(data).size;
    const roomNumber = parseInt(data.slice(4)) + 1;
    const room = 'room' + roomNumber.toString();
    if (roomSize <= 2 || roomSize === null) {
      console.log('joining room1');
      socket.join(data);
    } else {
      console.log('making a new room');
      console.log('roomsize ' + roomSize);

      socket.join(room);
    }
    console.log(socket.rooms);
    console.log(io.sockets.adapter.rooms.get(data).size);
  });
  socket.on('send_message', data => {
    console.log(socket.rooms);
    console.log(data);
    socket.broadcast.to(data.room).emit('receive_message', data);
  });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`);
});
