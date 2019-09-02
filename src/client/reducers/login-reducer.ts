import syncReducer from 'sync-reducer';

import { LoginActionObject, login, usernameTaken } from '../actions';
import socket from '../socket';
import store from '../store';

export interface Login {
  username: string;
  loggedIn: boolean;
  loginError: string;
}

const initialState: Login = {
  username: '',
  loggedIn: false,
  loginError: ''
};

function loginReducer(state: Login = initialState, action: LoginActionObject) {
  if(action.type === 'UPDATE_USERNAME') {
    const newState = { ...state };

    // If the username is greater than 16 characters or contains spaces.
    if(action.username.length > 16 || action.username.includes(' ')) {
      return newState;
    }

    newState.username = action.username;
    newState.loginError = '';

    return newState;
  }
  if(action.type === 'SUBMIT_USERNAME') {
    const newState = { ...state };

    if(newState.username.length < 2 || newState.username.length > 16) {
      newState.loginError = 'Your username must be at least two characters and at most 16.';
      return newState;
    }

    socket.emit('checkUsername', newState.username, (loginResult: boolean) => {
      if(loginResult) {
        return store.dispatch(login());
      }
      store.dispatch(usernameTaken());
    });

    return newState;
  }
  if(action.type === 'LOGIN') {
    const newState = { ...state };

    newState.loggedIn = true;

    return newState;
  }
  if(action.type === 'USERNAME_TAKEN') {
    const newState = { ...state };

    newState.loginError = 'That username is in use right now. Choose another username or wait.';

    return newState;
  }

  return state;
}

export default syncReducer(loginReducer, 'trivoga-login', { ignore: ['loggedIn'] });
