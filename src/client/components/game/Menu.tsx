import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import socket from '../../socket';

import store, { Store } from '../../store';
import { toggleCreationWindow, recieveRoomData } from '../../actions';
import { Room } from '../../../shared/types';

import CreationWindow from './CreationWindow';

function Menu({ creationWindowOpen, toggleCreationWindow }: { creationWindowOpen: boolean, toggleCreationWindow: () => void }) {
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
        <input type='text' />
        <button placeholder='Room Code'>Join Room</button>
      </div>
    </div>
  );
}

const mapStateToProps = (state: Store) => ({
  creationWindowOpen: state.menu.creationWindowOpen
});
const mapDispatchToProps = {
  toggleCreationWindow
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
