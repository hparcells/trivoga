import React from 'react';
import { connect } from 'react-redux';
import { decodeHTML } from 'entities';

import socket from '../../../socket';

import { Store } from '../../../store';
import { Room } from '../../../../shared/types';

import Answer from './Answer';
import PostGame from './PostGame';

function Trivia(
  {
    room,
    selectedAnswer
  }:
  {
    room: Room | null,
    selectedAnswer: string
  }
) {
  const triviaData = room && room.trivia;

  return (
    <div>
      {
        room && room.hasWinner
        ? <PostGame />
        : <div>
          <p>Scores:</p>
          {
            room && room.players.map((player, index) => {
              return (
                <li key={index}>{player.username}: {player.score}</li>
              );
            })
          }

          <p>Question {triviaData && triviaData.round}: {triviaData && decodeHTML(triviaData.question)}</p>
          {
            triviaData && triviaData.answers.map((answer, index) => {
              return (
                <span
                  style={{
                    color: selectedAnswer ? triviaData.answer === answer ? 'green' : 'red' : 'black'
                  }}
                  key={index}
                >
                  <Answer label={answer} />
                </span>
              )
            })
          }
        </div>
      }
    </div>
  );
}

const mapStateToProps = (state: Store) => ({
  room: state.game.room,
  selectedAnswer: state.game.selectedAnswer
});

export default connect(mapStateToProps, {})(Trivia);
