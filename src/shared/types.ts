import { Difficulty, Type, CategoryId } from '../client/reducers/menu-reducer';

export interface GameOptions {
  difficulty: Difficulty,
  type: Type,
  category: CategoryId
};
export interface Player {
  username: string,
  score: number,
  ready: boolean
}
export interface Room {
  players: Player[],
  roomCode: string,
  gameOptions: GameOptions
  started: boolean,
  trivia: {
    question: string,
    answer: string,
    incorrectAnswers: string[],
    sessionToken: string
  }
}
