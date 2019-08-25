import { LoginActionObject, GameActionObject, MeunuActionObject } from "./action-types";
import { Difficulty } from "../reducers/menu-reducer";

export function updateUsername(username: string): LoginActionObject {
  return { type: 'UPDATE_USERNAME', username };
}
export function submitUsername(): LoginActionObject {
  return { type: 'SUBMIT_USERNAME' };
}

export function updatePlayerCount(count: number): GameActionObject {
  return { type: 'UPDATE_PLAYER_COUNT', count };
}

export function toggleCreationWindow(): MeunuActionObject {
  return { type:'TOGGLE_CREATION_WINDOW' };
}
export function changeDifficulty(difficulty: Difficulty): MeunuActionObject {
  return { type: 'CHANGE_DIFFICULTY', difficulty };
}
