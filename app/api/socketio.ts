const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const httpServer = http.createServer();
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

function generateRandom(maxLimit) {
  let rand = Math.random() * maxLimit;
  rand = Math.floor(rand);
  return rand;
}

function getRandomItem(rooms) {
  for (const room of rooms) {
    if (room.size >= 2) {
      rooms.delete(room);
    }
  }
  let items = Array.from(rooms);
  return items[Math.floor(Math.random() * items.length)];
}

io.on('connection', socket => {
  console.log(`User Connected: ${socket.id}`);

  socket.on('find_rooms', () => {
    let randomRoom;
    let id;
    const roomSet = io.sockets.adapter.rooms;
    const [rooms] = io.sockets.adapter.rooms;
    const getRoom = () => {
      for (const room of rooms) {
        if (room.size === 1) {
          randomRoom = getRandomItem(roomSet);
          id = randomRoom;
          break;
        }
      }
      if (id === undefined) id = uuidv4();
      return id;
    };

    let roomId = getRoom();

    if (typeof roomId === 'object') {
      roomId = [...roomId][0];
    }
    console.log(io.sockets.adapter.rooms);
    socket.join(roomId);
    console.log(io.sockets.adapter.rooms);
  });

  socket.on('join_room', data => {
    if (io.sockets.adapter.rooms.has(data)) {
      socket.join(data);
    } else {
      console.log(socket.id + 'tried to join ' + data + 'but the room does not exist.');
      // Socket.join is not executed, hence the room not created.
    }
    // console.log(socket.rooms);
    // console.log(data);
    // socket.join(data);
    // console.log(socket.rooms);
    // const rooms = io.sockets.adapter.rooms.get(data);
    // console.log(rooms);
    // socket.emit('new_rooms', rooms);
  });

  socket.on('send_message', data => {
    socket.broadcast.to(data.room).emit('receive_message', data);
  });
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`);
});
