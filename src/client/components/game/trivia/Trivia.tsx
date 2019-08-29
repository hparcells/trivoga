import React from 'react';
import { connect } from 'react-redux';
import { shuffle } from '@reverse/array';

import { Store } from '../../../store';
import { Room } from '../../../../shared/types';

import Answer from './Answer';

function Trivia({ room }: { room: Room | null }) {
  const triviaData = room && room.trivia;

  return (
    <div>
      <p>Question: {triviaData && triviaData.question}</p>
      {
        triviaData && shuffle(triviaData.incorrectAnswers.concat(triviaData.answer)).map((answer, index) => {
          return (
            <Answer key={index} label={answer} />
          )
        })
      }
    </div>
  );
}

const mapStateToProps = (state: Store) => ({
  room: state.game.room
});

export default connect(mapStateToProps, {})(Trivia);
  