import { io } from 'fullstack-system';
import { Socket } from 'socket.io';

import setupLogin from './handlers/login';
import setupRooms from './handlers/rooms';

export interface GameSocket extends Socket  {
  username: string,
  roomCode: string
}

io.on('connection', (socket: any) => {
  setupLogin(socket);
  setupRooms(socket);
});
