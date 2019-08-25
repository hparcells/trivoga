import { Difficulty } from "../reducers/menu-reducer";

export type LoginActionObject
  = { type: 'UPDATE_USERNAME', username: string }
  | { type: 'SUBMIT_USERNAME' }
  | { type: 'LOGIN' }
  | { type: 'USERNAME_TAKEN' }

export type GameActionObject
  = { type: 'UPDATE_PLAYER_COUNT', count: number };

export type MeunuActionObject
  = { type: 'TOGGLE_CREATION_WINDOW' }
  | { type: 'CHANGE_DIFFICULTY', difficulty: Difficulty };

export type ActionObject = LoginActionObject | GameActionObject | MeunuActionObject;
