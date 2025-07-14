// src/utils/socket.js
import { io } from 'socket.io-client';
import { API_BASE } from './apiBaseUrl';

let socket = null;
const SOCKET_BASE = API_BASE.split('/app')[0];

export const connectSocket = (userId, groupId) => {
  if (!socket && userId) {
    socket = io(SOCKET_BASE, {
      withCredentials: true,
    });

    socket.on('connect', () => {
      console.log('🔄 Reconnected socket:', socket.id);
      if (userId) socket.emit('join', userId);
      if (groupId) socket.emit('joinGroup', groupId);
    });

    socket.on('disconnect', () => {
      console.log('⚡ Socket disconnected');
    });
  }
  return socket;
};

export const getSocket = () => socket;
