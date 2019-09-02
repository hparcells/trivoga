import { io } from 'fullstack-system';

import { GameSocket } from '..';
import { rooms } from './rooms';

import { getSessionToken, getQuestionData, getApiUrl } from '../utils/trivia';

import shuffle from '../utils/shuffle';

export default function(socket: GameSocket) {
  async function newQuestion(hasPreviousRound: boolean) {
    // Get the question data from the API.
    const questionData = await getQuestionData(getApiUrl(rooms[socket.roomCode].gameOptions, rooms[socket.roomCode].trivia.sessionToken));

    // Set the question data for the players to use.
    rooms[socket.roomCode].trivia = {
      ...rooms[socket.roomCode].trivia,
      question: questionData.question,
      answer: questionData.answer,
      answers: shuffle(questionData.incorrectAnswers.concat(questionData.answer))
    };

    // Increase the round if there was a round during when we called this function.
    if(hasPreviousRound) {
      rooms[socket.roomCode].trivia.round++;
      rooms[socket.roomCode].trivia.submittedAnswers = 0;
    }

    // Add the question to the score card.
    rooms[socket.roomCode].scorecard.rounds.push({
      question: questionData.question,
      answer: questionData.answer,
      playerData: []
    });
  }

  socket.on('startGame', async() => {
    rooms[socket.roomCode].starting = true;
    io.sockets.to(socket.roomCode).emit('recieveRoomData', rooms[socket.roomCode]);

    try {
      // Generate a session token.
      rooms[socket.roomCode].trivia.sessionToken = await getSessionToken();
      rooms[socket.roomCode].started = true;

      // Get a question.
      await newQuestion(false);
    }catch (e) {
      // Webpage is blocked on network.
    }

    io.sockets.to(socket.roomCode).emit('recieveRoomData', rooms[socket.roomCode]);
  });
  socket.on('submitAnswer', async(answer: string) => {
    // Get our index in the players array.
    const playerIndex = rooms[socket.roomCode].players.map((player) => {
      return player.username;
    }).indexOf(socket.username);

    // Check whether or increase or decrease our score.
    if(answer === rooms[socket.roomCode].trivia.answer) {
      rooms[socket.roomCode].players[playerIndex].score++;
    }else {
      if(!(rooms[socket.roomCode].players[playerIndex].score - 1 < 0)) {
        rooms[socket.roomCode].players[playerIndex].score--;
      }
    }

    // Add our answer to the scorecard.
    rooms[socket.roomCode].scorecard.rounds[rooms[socket.roomCode].scorecard.rounds.length - 1].playerData.push({
      username: socket.username,
      providedAnswer: answer,
      score: rooms[socket.roomCode].players[playerIndex].score
    });

    // Check if we won.
    if(rooms[socket.roomCode].players[playerIndex].score === 10) {
      // If we answered before the other person.
      if(rooms[socket.roomCode].scorecard.rounds[rooms[socket.roomCode].scorecard.rounds.length - 1].playerData.length === 1) {
        const otherPlayerIndex = playerIndex === 0 ? 1 : 0;

        // Add them to the scorecard with the "None" answer.
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

    // Check if both players submitted answers.
    if(rooms[socket.roomCode].trivia.submittedAnswers === 2) {
      try {
        io.sockets.to(socket.roomCode).emit('recieveRoomData', rooms[socket.roomCode]);

        // Get a new question.
        await newQuestion(true);
      }catch (e) {
        // Webpage is blocked on network.
      }
    }

    io.sockets.to(socket.roomCode).emit('recieveRoomData', rooms[socket.roomCode]);
  });
}
