import { io } from 'fullstack-system';
import { Socket } from 'socket.io';

import setupLogin from './handlers/login';
import setupRooms from './handlers/rooms';
import setupTrivia from './handlers/trivia';

export interface GameSocket extends Socket  {
  username: string;
  roomCode: string;
}

io.on('connection', (socket: any) => {
  setupLogin(socket);
  setupRooms(socket);
  setupTrivia(socket);
});
