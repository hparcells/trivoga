import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import socket from '../../../socket';

import { Store } from '../../../store';
import { toggleCreationWindow, changeRoomCode, joinRoom } from '../../../actions';

import CreationWindow from './CreationWindow';

function Menu(
  {
    creationWindowOpen,
    roomCode,
    toggleCreationWindow,
    changeRoomCode,
    joinRoom
  }:
  {
    creationWindowOpen: boolean,
    roomCode: string,
    toggleCreationWindow: () => void
    changeRoomCode: (roomCode: string) => void,
    joinRoom: () => void
  }
) {
  useEffect(() => {
    function handleNonExistentRoom() {
      // TODO:
    }

    socket.on('roomNoExist', handleNonExistentRoom);

    return () => {
      socket.removeListener('roomNoExist', handleNonExistentRoom);
    };
  }, []);
  
  function handleRoomCodeChange(event: any) {
    changeRoomCode(event.target.value);
  }

  return (
    <div>
      <div>
        <button onClick={toggleCreationWindow}>Create Room</button>

        {
          creationWindowOpen 
          ? <CreationWindow />
          : null
        }
      </div>
  
      <br />
  
      <div>
        <input type='text' onChange={handleRoomCodeChange} value={roomCode} />
        <button onClick={joinRoom}>Join Room</button>
      </div>
    </div>
  );
}

const mapStateToProps = (state: Store) => ({
  creationWindowOpen: state.menu.creationWindowOpen,
  roomCode: state.menu.roomCode
});
const mapDispatchToProps = {
  toggleCreationWindow,
  changeRoomCode,
  joinRoom
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
