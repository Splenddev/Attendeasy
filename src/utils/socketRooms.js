// utils/socketRooms.js
import { getSocket } from './socket';

export const joinGroupRoom = (groupId) => {
  const socket = getSocket();
  if (socket && groupId) {
    socket.emit('joinGroup', groupId.toString());
  }
};

export const leaveGroupRoom = (groupId) => {
  const socket = getSocket();
  if (socket && groupId) {
    socket.emit('leaveGroup', groupId.toString());
  }
};
