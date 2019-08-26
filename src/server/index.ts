import { io } from 'fullstack-system';

import setupLogin from './handlers/login';
import setupRooms from './handlers/rooms';

io.on('connection', (socket: any) => {
  setupLogin(socket);
  setupRooms(socket);
});
