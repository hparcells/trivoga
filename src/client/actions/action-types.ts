import { Difficulty, Type, CategoryId } from "../reducers/menu-reducer";
import { GameOptions, Room } from "../../shared/types";

export type LoginActionObject
  = { type: 'UPDATE_USERNAME', username: string }
  | { type: 'SUBMIT_USERNAME' }
  | { type: 'LOGIN' }
  | { type: 'USERNAME_TAKEN' }

export type MenuActionObject
  = { type: 'TOGGLE_CREATION_WINDOW' }
  | { type: 'CHANGE_DIFFICULTY', difficulty: Difficulty }
  | { type: 'CHANGE_TYPE', newType: Type }
  | { type: 'CHANGE_CATEGORY', category: CategoryId }
  | { type: 'CREATE_ROOM', gameOptions: GameOptions };
  
export type GameActionObject
  = { type: 'UPDATE_PLAYER_COUNT', count: number }
  | { type: 'RECIEVE_ROOM_DATA', roomData: Room };
  
export type ActionObject = LoginActionObject | GameActionObject | MenuActionObject;
