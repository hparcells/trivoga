import React from 'react';
import { connect } from 'react-redux';

import { Store } from '../../../store';
import { Room } from '../../../../shared/types';
import { leaveGame } from '../../../actions';

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
  return (
    <div>
      <h1>{room && room.winner} Won!</h1>
      <button onClick={leaveGame}>Back to Home</button>
    </div>
  );
}

const mapStateToProps = (state: Store) => ({
  room: state.game.room,
});
const mapDispatchToProps = {
  leaveGame
};

export default connect(mapStateToProps, mapDispatchToProps)(PostGame);
