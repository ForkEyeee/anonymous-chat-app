const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const httpServer = http.createServer();
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

function findAvailableRoom(rooms) {
  for (const [roomID, participants] of rooms) {
    if (participants.size === 1) {
      return roomID;
    }
  }
  return null;
}

io.on('connection', socket => {
  console.log(`User Connected: ${socket.id}`);

  socket.on('find_room', () => {
    const rooms = io.sockets.adapter.rooms;
    let roomID = findAvailableRoom(rooms);

    if (!roomID) {
      roomID = socket.id;
      console.log('Creating a new room:', roomID);
    } else {
      console.log('Joining an existing room:', roomID);
    }
    socket.leaveAll();
    socket.join(roomID);
    const roomSize = io.sockets.adapter.rooms.get(roomID).size;

    const roomInfo = {
      roomID,
      userID: socket.id,
      size: roomSize,
    };
    console.log(io.sockets.adapter.rooms);
    socket.emit('room_info', roomInfo);
    if (roomSize > 1) {
      io.to(roomID).emit('user_joined', socket.id);
    }
  });

  socket.on('send_message', data => {
    console.log(`Message from ${socket.id}:`, data);
    const room = Array.from(socket.rooms)[0];
    console.log(room);
    socket.broadcast.to(room).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
    // socket.leaveAll();
    socket.broadcast.emit('user_left', socket.id);
  });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`);
});
