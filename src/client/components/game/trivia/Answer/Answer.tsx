import React from 'react';
import { connect } from 'react-redux';
import { decodeHTML } from 'entities';
import { Grid } from '@material-ui/core';

import { submitAnswer } from '../../../../actions';
import { Store } from '../../../../store';

import styles from './Answer.module.css';

function Answer(
  {
    label,
    resultClass,
    hasAnsweredQuestion,
    submitAnswer,
  }:
  {
    label: string,
    resultClass: string,
    hasAnsweredQuestion: boolean,
    submitAnswer: (answer: string) => void
  }
) {
  function handleAnswerClick() {
    if(!hasAnsweredQuestion) {
      submitAnswer(label);
    }
  }

  return (
    <Grid item xs={12}
      className={
        resultClass === 'root'
          ? styles.root
          : resultClass === 'correct'
            ? styles.correct
            : styles.incorrect
      }
      onClick={handleAnswerClick}
      >
      <div className={styles.text}>{decodeHTML(label)}</div>
    </Grid>
  );
}

const mapStateToProps = (state: Store) => ({
  hasAnsweredQuestion: state.game.hasAnsweredQuestion,
});
const mapDispatchToProps = {
  submitAnswer
}

export default connect(mapStateToProps, mapDispatchToProps)(Answer);
