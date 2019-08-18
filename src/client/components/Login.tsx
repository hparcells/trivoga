import React from 'react';
import { connect } from 'react-redux';

import { Store } from '../store';
import { updateUsername, submitUsername } from '../actions';

function Login(
  { username,
    online,
    loginError,
    updateUsername,
    submitUsername 
  }:
  { username: string,
    online: number,
    loginError: string,
    updateUsername: (name: string) => void,
    submitUsername: () => void
  }
) {
  function handleUsernameChange(event: any) {
    updateUsername(event.target.value);
  }

  return (
    <div>
      <p>Online: {online || 'Fetching...'}</p>
      <div>Username: <input type='text' onChange={handleUsernameChange} value={username}></input></div>
      <button onClick={submitUsername}>Play!</button>

      {
        !!loginError
        ? <p style={{
          color: '#ff0000'
        }}>{loginError}</p>
        : null
      }
    </div>
  );
}

const mapStateToProps = (state: Store) => ({
  username: state.login.username,
  online: state.game.online,
  loginError: state.login.loginError
});
const mapDispatchToProps = {
  updateUsername,
  submitUsername
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
