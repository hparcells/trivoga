import { io } from 'fullstack-system';
import { removeAt } from '@reverse/array';

import { GameOptions, Room, Player } from '../../shared/types';
import { GameSocket } from '..';

import { generateRoomCode } from '../utils/room';
import { room } from '../utils/logger';

export const rooms: {[K in string]: Room} = {};

export default function(socket: GameSocket) {
  function destoryRoom() {
    socket.leave(socket.roomCode);
    delete rooms[socket.roomCode];
    
    room(`Room ${socket.roomCode} destoryed.`);
  }
  function leaveRoom() {
    if(socket.roomCode) {
      if(rooms[socket.roomCode].players.length === 1) {
        destoryRoom();
        
        return;
      }
  
      const index = rooms[socket.roomCode].players.map((player) => {
        return player.username;
      }).indexOf(socket.username);
      rooms[socket.roomCode].players = removeAt(rooms[socket.roomCode].players, index);
    }

    io.sockets.to(socket.roomCode).emit('recieveRoomData', rooms[socket.roomCode]);
  }

  socket.on('createRoom', (gameOptions: GameOptions) => {
    let roomCode;

    do {
      roomCode = generateRoomCode();
    }while(Object.keys(rooms).includes(roomCode));

    const playerObject: Player = {
      username: socket.username,
      score: 0,
      ready: false
    }
    const roomObject: Room = {
      players: [playerObject],
      roomCode: roomCode,
      gameOptions,
      started: false,
      trivia: {
        round: 1,
        question: '',
        answer: '',
        answers: [],
        sessionToken: '',
        submittedAnswers: 0
      }
    };

    rooms[roomCode] = roomObject;
    socket.roomCode = roomCode;

    socket.join(roomCode);

    room(`Room ${roomCode} created.`);

    socket.emit('recieveRoomData', roomObject);
  });
  socket.on('joinRoom', (roomCode: string) => {
    if(!Object.keys(rooms).includes(roomCode)) {
      socket.emit('roomNoExist');

      return;
    }

    rooms[roomCode].players.push({
      username: socket.username,
      score: 0,
      ready: false
    });

    socket.join(roomCode);
    socket.roomCode = roomCode;
    
    io.sockets.to(roomCode).emit('recieveRoomData', rooms[roomCode]);
  });
  socket.on('toggleReady', () => {
    const playerIndex = rooms[socket.roomCode].players.map((player) => {
      return player.username;
    }).indexOf(socket.username);

    rooms[socket.roomCode].players[playerIndex].ready = !rooms[socket.roomCode].players[playerIndex].ready;

    io.sockets.to(socket.roomCode).emit('recieveRoomData', rooms[socket.roomCode]);
  });

  socket.on('disconnect', () => {
    leaveRoom();
  });
}
