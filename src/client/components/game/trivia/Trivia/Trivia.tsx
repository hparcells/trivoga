import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';

import { Store } from '../../../../store';
import { Room } from '../../../../../shared/types';

import Answer from '../Answer/Answer';
import PostGame from '../PostGame/PostGame';
import Question from '../Question/Question';

import styles from './Trivia.module.css';

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
          <div className={styles.scoreWrapper}>
            <div className={styles.scoreDiv}>
              <p className={styles.scoreScore}>{room && room.players[0].score}</p>
              <p className={styles.scoreName}>{room && room.players[0].username}</p>
            </div>
            <div className={styles.scoreDiv}>
              <p className={styles.scoreRound}>Question</p>
              <p className={styles.scoreRound}>{triviaData && triviaData.round}</p>
            </div>
            <div className={styles.scoreDiv} style={{
              textAlign: 'right'
            }}>
              <p className={styles.scoreScore}>{room && room.players[1].score}</p>
              <p className={styles.scoreName}>{room && room.players[1].username}</p>
            </div>
          </div>

          <Question />
          <Grid container>
            {
              triviaData && triviaData.answers.map((answer, index) => {
                return (
                  <Answer key={index} label={answer} resultClass={selectedAnswer ? triviaData.answer === answer ? 'correct' : 'incorrect' : 'root'} />
                )
              })
            }
          </Grid>
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
