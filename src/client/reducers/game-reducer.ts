import { GameActionObject } from "../actions";

export interface Game {
  online: number
};

const initialState: Game = {
  online: 0,
};

export default function(state: Game = initialState, action: GameActionObject) {
  if(action.type === 'UPDATE_PLAYER_COUNT') {
    const newState = { ...state };

    newState.online = action.count;
    
    return newState;
  }

  return state;
}
