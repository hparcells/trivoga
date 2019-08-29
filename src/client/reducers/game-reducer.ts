import { GameActionObject } from '../actions';
import { Room } from '../../shared/types';
import socket from '../socket';

export interface Game {
  online: number,
  room: Room | null,
  ready: boolean,
  startButtonDisabled: boolean
};

const initialState: Game = {
  online: 0,
  room: null,
  ready: false,
  startButtonDisabled: false
};

export default function(state: Game = initialState, action: GameActionObject) {
  if(action.type === 'UPDATE_PLAYER_COUNT') {
    const newState = { ...state };

    newState.online = action.count;
    
    return newState;
  }
  if(action.type === 'RECIEVE_ROOM_DATA') {
    const newState = { ...state };

    newState.room = action.roomData;
    
    return newState;
  }
  if(action.type === 'TOOGLE_READY') {
    const newState = { ...state };

    newState.ready = !newState.ready;
    socket.emit('toggleReady');

    return newState;
  }
  if(action.type === 'START_GAME') {
    const newState = { ...state };

    newState.startButtonDisabled = true;

    socket.emit('startGame');

    return newState;
  }

  return state;
}
