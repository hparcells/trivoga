import { removeAt } from '@reverse/array';

import { generateRoomCode } from "../utils/room";
import { GameOptions, Room } from "../../shared/types";
import { room } from "../utils/logger";

const rooms: {[K in string]: Room} = {};

export default function(socket: any) {
  function destoryRoom() {
    socket.leave(socket.roomCode);
    delete rooms[socket.roomCode];
  }

  socket.on('createRoom', (gameOptions: GameOptions) => {
    let roomCode;

    do {
      roomCode = generateRoomCode();
    }while(Object.keys(rooms).includes(roomCode));

    const roomObject: Room = {
      players: [socket.username],
      roomCode: roomCode,
      gameOptions,
      started: false
    };

    rooms[roomCode] = roomObject;
    socket.roomCode = roomCode;

    socket.join(roomCode);

    room(`Room ${roomCode} created.`);

    socket.emit('recieveRoomData', roomObject);
  });

  socket.on('disconnect', () => {
    if(socket.roomCode) {
      if(rooms[socket.roomCode].players.length === 1) {
        destoryRoom();

        room(`Room ${socket.roomCode} destoryed.`);
        return;
      }

      const index = rooms[socket.roomCode].players.map((player) => {
        return player.username;
      }).indexOf(socket.username);
      rooms[socket.roomCode].players = removeAt(rooms[socket.roomCode].players, index);
    }
  });
}
