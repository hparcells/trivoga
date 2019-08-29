import React from 'react';
import { connect } from 'react-redux';
import { decodeHTML } from 'entities';

import { submitAnswer } from '../../../actions';
import { Store } from '../../../store';

function Answer(
  {
    label,
    hasAnsweredQuestion,
    submitAnswer,
  }:
  {
    label: string,
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
    <li onClick={handleAnswerClick}>{decodeHTML(label)}</li>
  );
}

const mapStateToProps = (state: Store) => ({
  hasAnsweredQuestion: state.game.hasAnsweredQuestion,
});
const mapDispatchToProps = {
  submitAnswer
}

export default connect(mapStateToProps, mapDispatchToProps)(Answer);
