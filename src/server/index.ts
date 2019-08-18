import { io, app } from 'fullstack-system';

let value = 0;

io.on('connection', function (socket) {
  socket.emit('value', value);
  socket.on('click', () => {
    value += 1;
    io.sockets.emit('value', value);
  });
});

app.get('/api-test', (req, res) => {
  res.end('It Works!');
});

app.get('/value', (req, res) => {
  res.end(value.toString());
});
