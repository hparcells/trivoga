import { LoginActionObject, GameActionObject } from "./action-types";

export function updateUsername(username: string): LoginActionObject {
  return { type: 'UPDATE_USERNAME', username };
}
export function submitUsername(): LoginActionObject {
  return { type: 'SUBMIT_USERNAME' };
}

export function updatePlayerCount(count: number): GameActionObject {
  return { type: 'UPDATE_PLAYER_COUNT', count };
}
