import { socket } from '@/lib/socket';

export default async function getRoomInfo() {
  let room;
  socket.emit('find_rooms');
  socket.on('room_info', roomInfo => {
    room = roomInfo;
    return room;
  });

  return room;
}
