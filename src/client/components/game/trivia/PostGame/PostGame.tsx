import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import { Store } from '../../../../store';
import { Room } from '../../../../../shared/types';
import { leaveGame } from '../../../../actions';

import Scorecard from './Scorecard';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: 'none'
  }
}));

function PostGame(
  {
    room,
    leaveGame
  }:
  {
    room: Room | null,
    leaveGame: () => void
  }
) {
  const classes = useStyles();

  return (
    <div>
      <Typography variant='h3'>{room && room.winner} Won!</Typography>
      <Scorecard />
      <Button variant='contained' color='primary' className={classes.button} onClick={leaveGame}>
        Back to Home
      </Button>
    </div>
  );
}

const mapStateToProps = (state: Store) => ({
  room: state.game.room
});
const mapDispatchToProps = {
  leaveGame
};

export default connect(mapStateToProps, mapDispatchToProps)(PostGame);
