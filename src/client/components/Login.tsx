import React from 'react';
import { connect } from 'react-redux';

import { Store } from '../store';
import { updateUsername, submitUsername } from '../actions';

function Login({ username, online, updateUsername, submitUsername }: { username: string, online: number, updateUsername: (name: string) => void, submitUsername: () => void }) {
  function handleUsernameChange(event: any) {
    updateUsername(event.target.value);
  }

  return (
    <div>
      <p>Online: {online || 'Fetching...'}</p>
      <div>Username: <input type='text' onChange={handleUsernameChange} value={username}></input></div>
      <button onClick={submitUsername}>Play!</button>
    </div>
  );
}

const mapStateToProps = (state: Store) => ({
  username: state.login.username,
  online: state.game.online
});
const mapDispatchToProps = {
  updateUsername,
  submitUsername
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
