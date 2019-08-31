import { io } from 'fullstack-system';

import { GameSocket } from '..';
import { rooms } from './rooms';

import { getSessionToken, getQuestionData, getApiUrl } from '../utils/trivia';

import shuffle from '../utils/shuffle';

export default function(socket: GameSocket) {
  async function newQuestion(hasPreviousRound: boolean) {
    const questionData = await getQuestionData(getApiUrl(rooms[socket.roomCode].gameOptions, rooms[socket.roomCode].trivia.sessionToken));
    rooms[socket.roomCode].trivia = {
      ...rooms[socket.roomCode].trivia,
      question: questionData.question,
      answer: questionData.answer,
      answers: shuffle(questionData.incorrectAnswers.concat(questionData.answer))
    }
    
    if(hasPreviousRound) {
      rooms[socket.roomCode].trivia.round++;
      rooms[socket.roomCode].trivia.submittedAnswers = 0;
    }

    rooms[socket.roomCode].scorecard.rounds.push({
      question: questionData.question,
      answer: questionData.answer,
      playerData: []
    });
  }

  
  socket.on('startGame', async() => {
    try {
      rooms[socket.roomCode].trivia.sessionToken = await getSessionToken();
      rooms[socket.roomCode].started = true;

      await newQuestion(false);
    }catch(e) {
      // Webpage is blocked on network.
    }

    io.sockets.to(socket.roomCode).emit('recieveRoomData', rooms[socket.roomCode]);
  });
  socket.on('submitAnswer', async(answer: string) => {
    const playerIndex = rooms[socket.roomCode].players.map((player) => {
      return player.username;
    }).indexOf(socket.username);

    if(answer === rooms[socket.roomCode].trivia.answer) {
      rooms[socket.roomCode].players[playerIndex].score++;
    }else {
      if(!(rooms[socket.roomCode].players[playerIndex].score - 1 < 0)) {
        rooms[socket.roomCode].players[playerIndex].score--;
      }
    }

    rooms[socket.roomCode].scorecard.rounds[rooms[socket.roomCode].scorecard.rounds.length - 1].playerData.push({
      username: socket.username,
      providedAnswer: answer,
      score: rooms[socket.roomCode].players[playerIndex].score
    });

    // TODO: Change this
    if(rooms[socket.roomCode].players[playerIndex].score === 2) {
      if(rooms[socket.roomCode].scorecard.rounds[rooms[socket.roomCode].scorecard.rounds.length - 1].playerData.length === 1) {
        const otherPlayerIndex = playerIndex === 0 ? 1 : 0;
  
        rooms[socket.roomCode].scorecard.rounds[rooms[socket.roomCode].scorecard.rounds.length - 1].playerData.push({
          username: rooms[socket.roomCode].players[otherPlayerIndex].username,
          providedAnswer: 'None',
          score: rooms[socket.roomCode].players[otherPlayerIndex].score
        });
      }

      rooms[socket.roomCode].hasWinner = true;
      rooms[socket.roomCode].winner = socket.username;

      io.sockets.to(socket.roomCode).emit('recieveRoomData', rooms[socket.roomCode]);

      return;
    }

    rooms[socket.roomCode].trivia.submittedAnswers++;

    if(rooms[socket.roomCode].trivia.submittedAnswers === 2) {
      try {
        io.sockets.to(socket.roomCode).emit('recieveRoomData', rooms[socket.roomCode]);

        await newQuestion(true);
      }catch(e) {
        // Webpage is blocked on network.
      }
    }
    
    io.sockets.to(socket.roomCode).emit('recieveRoomData', rooms[socket.roomCode]);
  });
}
