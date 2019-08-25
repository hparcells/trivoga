import React from 'react';
import { connect } from 'react-redux';

import { Store } from '../../store';
import { toggleCreationWindow } from '../../actions';

import CreationWindow from './CreationWindow';

function Menu({ creationWindowOpen, toggleCreationWindow }: { creationWindowOpen: boolean, toggleCreationWindow: () => void }) {
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
