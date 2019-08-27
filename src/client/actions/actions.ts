import { LoginActionObject, GameActionObject, MenuActionObject } from './action-types';
import { Difficulty, Type, CategoryId } from '../reducers/menu-reducer';
import { GameOptions, Room } from '../../shared/types';

export function updateUsername(username: string): LoginActionObject {
  return { type: 'UPDATE_USERNAME', username };
}
export function submitUsername(): LoginActionObject {
  return { type: 'SUBMIT_USERNAME' };
}
export function login(): LoginActionObject {
  return { type: 'LOGIN' };
}
export function usernameTaken(): LoginActionObject {
  return { type: 'USERNAME_TAKEN' };
}

export function toggleCreationWindow(): MenuActionObject {
  return { type:'TOGGLE_CREATION_WINDOW' };
}
export function changeDifficulty(difficulty: Difficulty): MenuActionObject {
  return { type: 'CHANGE_DIFFICULTY', difficulty };
}
export function changeType(newType: Type): MenuActionObject {
  return { type: 'CHANGE_TYPE', newType };
}
export function changeCategory(category: CategoryId): MenuActionObject {
  return { type: 'CHANGE_CATEGORY', category };
}
export function createRoom(gameOptions: GameOptions): MenuActionObject {
  return { type: 'CREATE_ROOM', gameOptions };
}
export function changeRoomCode(roomCode: string): MenuActionObject {
  return { type: 'CHANGE_ROOM_CODE', roomCode };
}
export function joinRoom(): MenuActionObject {
  return { type: 'JOIN_ROOM' };
}

export function updatePlayerCount(count: number): GameActionObject {
  return { type: 'UPDATE_PLAYER_COUNT', count };
}
export function recieveRoomData(roomData: Room): GameActionObject {
  return { type: 'RECIEVE_ROOM_DATA', roomData };
}
export function toggleReady(): GameActionObject {
  return { type: 'TOOGLE_READY' };
}
export function startGame(): GameActionObject {
  return { type: 'START_GAME' };
}
