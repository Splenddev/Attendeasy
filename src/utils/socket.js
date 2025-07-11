// src/utils/socket.js
import { io } from 'socket.io-client';
import { API_BASE } from './apiBaseUrl';

let socket = null;
const SOCKET_BASE = API_BASE.split('/app')[0];

export const connectSocket = (userId) => {
  if (!socket && userId) {
    socket = io(SOCKET_BASE, {
      withCredentials: true,
    });

    socket.on('connect', () => {
      console.log('🔌 Socket connected:', socket.id);
      socket.emit('join', userId); // Join user room
    });

    socket.on('disconnect', () => {
      console.log('⚡ Socket disconnected');
    });
  }
  return socket;
};

export const getSocket = () => socket;
