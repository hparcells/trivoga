import { Difficulty, Type, CategoryId } from '../reducers/menu-reducer';
import { GameOptions, Room } from '../../shared/types';

export type LoginActionObject
  = { type: 'UPDATE_USERNAME', username: string }
  | { type: 'SUBMIT_USERNAME' }
  | { type: 'LOGIN' }
  | { type: 'USERNAME_TAKEN' };

export type MenuActionObject
  = { type: 'TOGGLE_CREATION_WINDOW' }
  | { type: 'CHANGE_DIFFICULTY', difficulty: Difficulty }
  | { type: 'CHANGE_TYPE', newType: Type }
  | { type: 'CHANGE_CATEGORY', category: CategoryId }
  | { type: 'CREATE_ROOM', gameOptions: GameOptions }
  | { type: 'CHANGE_ROOM_CODE', roomCode: string }
  | { type: 'JOIN_ROOM' };

export type GameActionObject
  = { type: 'UPDATE_PLAYER_COUNT', count: number }
  | { type: 'RECIEVE_ROOM_DATA', roomData: Room }
  | { type: 'TOOGLE_READY' }
  | { type: 'START_GAME' }
  | { type: 'SUBMIT_ANSWER', answer: string }
  | { type: 'NEW_ROUND' }
  | { type: 'LEAVE_GAME' };

export type ActionObject = LoginActionObject | GameActionObject | MenuActionObject;
