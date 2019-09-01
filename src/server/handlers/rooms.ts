import { io } from 'fullstack-system';
import { removeAt } from '@reverse/array';

import { GameOptions, Room, Player } from '../../shared/types';
import { GameSocket } from '..';

import { generateRoomCode } from '../utils/room';
import { room } from '../utils/logger';

export const rooms: {[K in string]: Room} = {};

export default function(socket: GameSocket) {
  function destoryRoom() {
    delete rooms[socket.roomCode];
    
    room(`Room ${socket.roomCode} destoryed.`);
  }
  function leaveRoom() {
    // Check if we are in a room or not.
    if(socket.roomCode) {
      // Check if we are the last one in the room.
      if(rooms[socket.roomCode].players.length === 1) {
        destoryRoom();
        
        // Cleanup.
        socket.roomCode = '';
        
        return;
      }

      // Get our index in the players array.
      const index = rooms[socket.roomCode].players.map((player) => {
        return player.username;
      }).indexOf(socket.username);

      // Check if we left mid-game.
      if(rooms[socket.roomCode].trivia.question && (rooms[socket.roomCode].players[0].score !== 10 || rooms[socket.roomCode].players[1].score !== 10)) {
        rooms[socket.roomCode].hasWinner = true;
        rooms[socket.roomCode].winner = index === 0 ? rooms[socket.roomCode].players[1].username : rooms[socket.roomCode].players[0].username;

        // An array of usernames of the player(s) that already submitted an answer.
        const existingAnswers = rooms[socket.roomCode].scorecard.rounds[rooms[socket.roomCode].scorecard.rounds.length - 1].playerData.map((player) => {
          return player.username;
        });

        // Add a "None" answer to the scorecard if player 1 did not answer the question.
        if(!existingAnswers.includes(rooms[socket.roomCode].players[0].username)) {
          rooms[socket.roomCode].scorecard.rounds[rooms[socket.roomCode].scorecard.rounds.length - 1].playerData.push({
            username: rooms[socket.roomCode].players[0].username,
            providedAnswer: 'None',
            score: rooms[socket.roomCode].players[0].score
          });
        }

        // Add a "None" answer to the scorecard if player 2 did not answer the question.
        if(!existingAnswers.includes(rooms[socket.roomCode].players[1].username)) {
          rooms[socket.roomCode].scorecard.rounds[rooms[socket.roomCode].scorecard.rounds.length - 1].playerData.push({
            username: rooms[socket.roomCode].players[1].username,
            providedAnswer: 'None',
            score: rooms[socket.roomCode].players[1].score
          });
        }

        io.sockets.to(socket.roomCode).emit('recieveRoomData', rooms[socket.roomCode]);

        // Remove the player from the players array.
        rooms[socket.roomCode].players = removeAt(rooms[socket.roomCode].players, index);

        // Cleanup.
        socket.leave(socket.roomCode);
        socket.roomCode = '';

        return;
      }

      // Remove the player from the players array.
      rooms[socket.roomCode].players = removeAt(rooms[socket.roomCode].players, index);
      
      // Cleanup.
      socket.leave(socket.roomCode);
      io.sockets.to(socket.roomCode).emit('recieveRoomData', rooms[socket.roomCode]);

      socket.roomCode = '';
    }
  }

  socket.on('createRoom', (gameOptions: GameOptions) => {
    let roomCode;

    // Keep generating room codes until we have found an unused one.
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
      starting: false,
      trivia: {
        round: 1,
        question: '',
        answer: '',
        answers: [],
        sessionToken: '',
        submittedAnswers: 0
      },
      hasWinner: false,
      winner: '',
      scorecard: {
        rounds: []
      }
    };

    // SEtup.
    rooms[roomCode] = roomObject;
    socket.roomCode = roomCode;

    socket.join(roomCode);

    room(`Room ${roomCode} created.`);

    socket.emit('recieveRoomData', roomObject);
  });
  socket.on('joinRoom', (roomCode: string) => {
    // Check if the room exists.
    if(!Object.keys(rooms).includes(roomCode)) {
      socket.emit('roomNoExist');

      return;
    }

    // Add the player to the room object.
    rooms[roomCode].players.push({
      username: socket.username,
      score: 0,
      ready: false
    });

    // Setup.
    socket.join(roomCode);
    socket.roomCode = roomCode;
    
    io.sockets.to(roomCode).emit('recieveRoomData', rooms[roomCode]);
  });
  socket.on('toggleReady', () => {
    // Get our index in the player array.
    const playerIndex = rooms[socket.roomCode].players.map((player) => {
      return player.username;
    }).indexOf(socket.username);

    rooms[socket.roomCode].players[playerIndex].ready = !rooms[socket.roomCode].players[playerIndex].ready;

    io.sockets.to(socket.roomCode).emit('recieveRoomData', rooms[socket.roomCode]);
  });
  socket.on('leaveRoom', () => {
    leaveRoom();
  });

  socket.on('disconnect', () => {
    leaveRoom();
  });
}
