const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const redisClient = require('../../lib/db.ts');

const httpServer = http.createServer();
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

function findAvailableRoom(rooms, socket) {
  for (const [roomID, participants] of rooms) {
    if (participants.size === 1 && !participants.has(socket.id)) {
      return roomID;
    }
  }
  return null;
}

async function cacheUserDetails(id) {
  let userDetails = await redisClient.get(id);

  if (userDetails === null) {
    userDetails = { userId: id, lastRoomId: '', otherChatterId: '' };
    await redisClient.set(id, JSON.stringify(userDetails));
  } else {
    userDetails = JSON.parse(userDetails);
  }

  return userDetails;
}

io.on('connection', async socket => {
  console.log(`User Connected: ${socket.id}`);
  const userDetails = await cacheUserDetails(socket.id);
  const rooms = io.sockets.adapter.rooms;

  if (userDetails.lastRoomId && userDetails.otherChatterId) {
    const roomExists = rooms.has(userDetails.lastRoomId);
    const otherChatterPresent =
      roomExists && rooms.get(userDetails.lastRoomId).has(userDetails.otherChatterId);
    const roomSize = roomExists ? io.sockets.adapter.rooms.get(userDetails.lastRoomId).size : 0;

    if (roomExists && otherChatterPresent && roomSize === 1) {
      socket.join(userDetails.lastRoomId);
    }
  }

  socket.on('find_room', async () => {
    let userDetails = await redisClient.get(socket.id);
    const alreadyInRoom = Array.from(socket.rooms).some(room => room !== socket.id);

    if (!alreadyInRoom) {
      const rooms = io.sockets.adapter.rooms;
      let roomID = findAvailableRoom(rooms, socket);

      if (!roomID) {
        roomID = socket.id;
        socket.join(roomID);
        console.log('Creating a new room:', roomID);
      } else {
        socket.leave(socket.id);
        socket.join(roomID);
        console.log('Joining an existing room:', roomID);
      }
      const currentRoom = socket.rooms.values().next().value;
      const participants = Array.from(io.sockets.adapter.rooms.get(currentRoom).keys());
      const otherParticipant = participants.find(participant => participant !== socket.id);

      userDetails = {
        userId: userDetails.userId,
        lastRoomId: roomID,
        otherChatterId: otherParticipant,
      };

      await redisClient.set(socket.id, JSON.stringify(userDetails));

      const roomSize = io.sockets.adapter.rooms.get(roomID).size;
      socket.emit('room_info', { roomID, roomSize });
      if (roomSize > 1) {
        io.to(roomID).emit('user_joined', socket.id);
      }
    }
    console.log(io.sockets.adapter.rooms);
  });

  socket.on('send_message', data => {
    console.log(`Message from ${socket.id}:`, data);
    const room = Array.from(socket.rooms)[0];
    socket.broadcast.to(room).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);

    console.log(io.sockets.adapter.rooms);
    socket.broadcast.emit('user_left', socket.id);
  });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`);
});
