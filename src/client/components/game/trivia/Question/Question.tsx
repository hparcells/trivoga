import React from 'react';
import { connect } from 'react-redux';
import { decodeHTML } from 'entities';

import { Store } from '../../../../store';
import { Room } from '../../../../../shared/types';

import styles from './Question.module.css';

function Question({ room }: { room: Room | null }) {
  const triviaData = room && room.trivia;

  return (
    <div className={styles.root}>
      <p className={styles.text}>
        {triviaData && decodeHTML(triviaData.question)}
      </p>
    </div>
  );
}

const mapStateToProps = (state: Store) => ({
  room: state.game.room
});

export default connect(mapStateToProps, {})(Question);
