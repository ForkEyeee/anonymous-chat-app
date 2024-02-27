const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const redisClient = require('../../lib/db.ts');
require('dotenv').config();

const httpServer = http.createServer();
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    transports: ['websocket'],
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

async function cacheUserDetails(id, otherUserId, roomId) {
  let userDetails = await redisClient.get(id);

  if (userDetails === null) {
    userDetails = { userId: id, otherUserId: otherUserId };
    await redisClient.set(roomId, JSON.stringify(userDetails));
  } else {
    userDetails = JSON.parse(userDetails);
  }
  return userDetails;
}

io.on('connection', socket => {
  console.log(`User Connected: ${socket.id}`);

  socket.on('find_room', () => {
  try {
      const alreadyInRoom = Array.from(socket.rooms).some(room => room !== socket.id);
      socket.roomID = socket.rooms.values().next().value;

    if (!alreadyInRoom) {
      const rooms = io.sockets.adapter.rooms;
      let roomID = findAvailableRoom(rooms, socket);

      if (!roomID) {
        roomID = socket.id;
        console.log('Creating a new room:', roomID);
      } else {
        console.log('Joining an existing room:', roomID);
      }

      socket.leave(socket.id);
      socket.join(roomID);
      socket.roomID = roomID;

      const roomSize = io.sockets.adapter.rooms.get(roomID).size;
      const participants = Array.from(io.sockets.adapter.rooms.get(roomID).keys());
      const otherParticipant = participants.find(participant => participant !== socket.id);

      if (roomID !== socket.id) {
        cacheUserDetails(socket.id, otherParticipant, roomID);
      }

      if (roomSize > 1) {
        io.to(roomID).emit('chat_connected', participants);
      }
    }
    } catch (error) {
      console.error(error)
}
    
  });

  socket.on('send_message', messageData => {
    try {
      const room = socket.rooms.values().next().value;
      io.to(room).emit('receive_message', messageData);
    } catch (error) {
      console.error(error)
    }
  });

  socket.on('disconnect', () => {
      const roomID = socket.roomID;
      (async () => {
        try {
          const userDetails = await redisClient.get(roomID);
          if (userDetails === null) return;
          io.to(roomID).emit('room_disconnect');
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      })();
  });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  try {
    console.log(`Socket.io server is running on port ${PORT}`);
  } catch (error) {
    console.error(error)
  }
});
