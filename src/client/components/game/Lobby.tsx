import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import socket from '../../socket';

import store, { Store } from '../../store';
import { Room } from '../../../shared/types';
import { toggleReady, recieveRoomData } from '../../actions';

import { normalizeDifficulty, normalizeType, normalizeCategoryId } from '../../utils/normalize';

function Lobby(
  {
    username,
    room,
    ready,
    toggleReady
  }:
  {
    username: string,
    room: Room | null,
    ready: boolean,
    toggleReady: () => void
  }
) {
  useEffect(() => {
    function handleRecieveRoomData(roomData: Room) {
      store.dispatch(recieveRoomData(roomData));
    }

    socket.on('recieveRoomData', handleRecieveRoomData);
    return () => {
      socket.removeListener('recieveRoomData', handleRecieveRoomData);
    };
  }, []);
  
  function handleToggleReady() {
    if(
      (room && room.players[0].ready == true) && (room && room.players[1].ready === true)
      && (room && room.players[0].username === username)
    ) {
      // startGame();
      return;
    }

    toggleReady();
  }

  return (
    <div>
      <p>TODO: Title</p>
      <p>Join with: {room && room.roomCode}</p>
      <p>{room && room.players[0].username} vs. {room && room.players[1] ? room.players[1].username : '???'}</p>
      <button onClick={handleToggleReady}>
        {
          room && room.players[0].username === username
          ? ready
            ?  (room && room.players[0].ready == true) && (room && room.players[1].ready === true)
              ? 'Start'
              : 'Not Ready'
            : 'Ready'
          : ready
            ? 'Not Ready'
            : 'Ready'
        }
      </button>
      <p>Game Options:</p>
      <ul>
        <li>Difficulty: {room && normalizeDifficulty(room.gameOptions.difficulty)}</li>
        <li>Type: {room && normalizeType(room.gameOptions.type)}</li>
        <li>Category: {room && normalizeCategoryId(room.gameOptions.category)}</li>
      </ul>
    </div>
  );
}

const mapStateToProps = (state: Store) => ({
  username: state.login.username,
  room: state.game.room,
  ready: state.game.ready 
});
const mapDispatchToProps = {
  toggleReady
}

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
