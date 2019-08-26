import React from 'react';
import { connect } from 'react-redux';

import { Store } from '../../store';
import { Room } from '../../../shared/types';

import Menu from './Menu';
import Lobby from './Lobby';

function Game({ room }: { room: Room | null }) {
  return (
    <div>
      {
        room
        ? room.started
          ? <p>Game</p>
          : <Lobby />
        : <Menu />
      }
    </div>
  );
}

const mapStateToProps = (state: Store) => ({
  room: state.game.room
});

export default connect(mapStateToProps, {})(Game);
