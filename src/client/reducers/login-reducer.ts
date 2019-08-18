import { ActionObject } from "../actions";

export interface Login {
  username: string,
  loggedIn: boolean
};

const initialState: Login = {
  username: '',
  loggedIn: false
};

export default function(state: Login = initialState, action: ActionObject) {
  if(action.type === 'UPDATE_USERNAME') {
    const newState = { ...state };

    // If the username is greater than 16 characters or contains spaces.
    if(action.username.length > 16 || action.username.includes(' ')) {
      return newState;
    }

    newState.username = action.username;

    return newState;
  }
  if(action.type === 'SUBMIT_USERNAME') {
    const newState = { ...state };
    
    if(newState.username.length < 2) {
      return newState;
    }
    
    // TODO: Check if username exists.
    
    newState.loggedIn = true;

    return newState;
  }

  return state;
}
