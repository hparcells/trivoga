import { io } from 'fullstack-system';
import { remove } from '@reverse/array';

import { GameSocket } from '..';

import { player } from '../utils/logger';

export let users: string[] = [];

export default function(socket: GameSocket) {
  setTimeout(() => {
    io.sockets.emit('playerCount', Object.keys(io.sockets.sockets).length);
  }, 500);

  socket.on('checkUsername', (username: string, callback: (loginResult: boolean) => void) => {
    if(!users.includes(username.toLowerCase())) {
      users.push(username.toLowerCase());
      socket.username = username;

      player(`${socket.username} connected.`);

      return callback(true);
    }
    callback(false);
  });

  socket.on('disconnect', () => {
    if(socket.username) {
      users = remove(users, socket.username.toLowerCase());

      player(`${socket.username} disconnected.`);
    }
    io.sockets.emit('playerCount', Object.keys(io.sockets.sockets).length);
  });
}
