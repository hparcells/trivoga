import { io } from 'fullstack-system';
import { remove } from '@reverse/array';

let users: string[] = [];

io.on('connection', (socket: any) => {
  setTimeout(() => {
    io.sockets.emit('playerCount', Object.keys(io.sockets.sockets).length);
  }, 500);

  socket.on('checkUsername', (username: string, callback: (loginResult: boolean) => void) => {
    if(!users.includes(username.toLowerCase())) {
      users.push(username.toLowerCase());
      socket.username = username;

      return callback(true);
    }
    callback(false);
  });
  
  socket.on('disconnect', () => {
    users = remove(users, socket.username);
    io.sockets.emit('playerCount', Object.keys(io.sockets.sockets).length);
  });
});
