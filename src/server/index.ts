import { io } from 'fullstack-system';

io.on('connection', (socket) => {
  setTimeout(() => {
    io.sockets.emit('playerCount', Object.keys(io.sockets.sockets).length);
  }, 500);
  
  socket.on('disconnect', () => {
    io.sockets.emit('playerCount', Object.keys(io.sockets.sockets).length);
  });
});
