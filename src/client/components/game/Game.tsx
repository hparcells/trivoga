import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import store, { Store } from '../../store';
import { Room } from '../../../shared/types';

import socket from '../../socket';

import { recieveRoomData } from '../../actions';

import Menu from './Menu';
import Lobby from './Lobby';

function Game({ room }: { room: Room | null }) {
  useEffect(() => {
    function handleRecieveRoomData(roomData: Room) {
      store.dispatch(recieveRoomData(roomData));
    }

    socket.on('recieveRoomData', handleRecieveRoomData);

    return () => {
      socket.removeListener('recieveRoomData', handleRecieveRoomData);
    };
  }, []);

  return (
    <div>
      {
        room
        ? room.started
          ? JSON.stringify(room)
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
