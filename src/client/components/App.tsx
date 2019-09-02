import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { Store } from '../store';
import { updatePlayerCount } from '../actions';

import Login from './Login';
import Game from './game/Game';

import socket from '../socket';

function App({ loggedIn, updatePlayerCount }: { loggedIn: boolean, updatePlayerCount: (count: number) => void }) {
  useEffect(() => {
    function playerCountChange(count: number) {
      updatePlayerCount(count);
    }

    socket.on('playerCount', playerCountChange);

    return () => {
      socket.removeListener('playerCount', playerCountChange);
    };
  }, []);

  return (
    <div>
      {
        loggedIn
        ? <Game />
        : <Login />
      }
    </div>
  );
}

const mapStateToProps = (state: Store) => ({
  loggedIn: state.login.loggedIn
});
const mapDispatchToProps = {
  updatePlayerCount
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
