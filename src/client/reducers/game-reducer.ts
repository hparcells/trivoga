import { GameActionObject } from '../actions';
import { Room } from '../../shared/types';
import socket from '../socket';

export interface Game {
  online: number,
  room: Room | null,
  ready: boolean,
  startButtonDisabled: boolean,
  hasAnsweredQuestion: boolean,
  selectedAnswer: string
};

const initialState: Game = {
  online: 0,
  room: null,
  ready: false,
  startButtonDisabled: false,
  hasAnsweredQuestion: false,
  selectedAnswer: ''
};

export default function(state: Game = initialState, action: GameActionObject) {
  if(action.type === 'UPDATE_PLAYER_COUNT') {
    const newState = { ...state };

    newState.online = action.count;
    
    return newState;
  }
  if(action.type === 'RECIEVE_ROOM_DATA') {
    const newState = { ...state };

    if(newState.room && newState.room.trivia.question !== action.roomData.trivia.question) {
      if(newState.room && newState.room.players.length !== 2) {
        return newState;
      }
      newState.hasAnsweredQuestion = false;
      newState.selectedAnswer = '';
    }

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
  if(action.type === 'SUBMIT_ANSWER') {
    const newState = { ...state };

    newState.hasAnsweredQuestion = true;
    newState.selectedAnswer = action.answer;

    socket.emit('submitAnswer', action.answer);

    return newState;
  }
  if(action.type === 'LEAVE_GAME') {
    let newState = { ...state };

    socket.emit('leaveRoom');
    
    newState = {
      ...newState,
      room: null,
      ready: false,
      startButtonDisabled: false,
      hasAnsweredQuestion: false,
      selectedAnswer: ''
    }

    return newState;
  }

  return state;
}
