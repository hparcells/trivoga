import { io } from 'fullstack-system';

import { GameSocket } from '..';
import { rooms } from './rooms';

import { getSessionToken, getQuestionData, getApiUrl } from '../utils/trivia';

export default function(socket: GameSocket) {
  async function newQuestion() {
    const questionData = await getQuestionData(getApiUrl(rooms[socket.roomCode].gameOptions, rooms[socket.roomCode].trivia.sessionToken));
    rooms[socket.roomCode].trivia = {
      ...rooms[socket.roomCode].trivia,
      question: questionData.question,
      answer: questionData.answer,
      incorrectAnswers: questionData.incorrectAnswers
    }
  }
  
  socket.on('startGame', async() => {
    rooms[socket.roomCode].trivia.sessionToken = await getSessionToken();
    rooms[socket.roomCode].started = true;

    await newQuestion();

    io.sockets.to(socket.roomCode).emit('recieveRoomData', rooms[socket.roomCode]);
  });
}
