import { Difficulty, Type, CategoryId } from "../client/reducers/menu-reducer";

export interface GameOptions {
  difficulty: Difficulty,
  type: Type,
  category: CategoryId
};
interface Player {
  username: string,
  score: number
}
export interface Room {
  players: Player[],
  roomCode: string,
  gameOptions: GameOptions
  started: boolean
}