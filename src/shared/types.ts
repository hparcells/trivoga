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
interface PlayerScorecard {
  username: string,
  providedAnswer: string,
  score: number
}
interface RoundInfo {
  question: string,
  answer: string,
  playerData: PlayerScorecard[]
}
export interface Scorecard {
  rounds: RoundInfo[]
}
export interface Room {
  players: Player[],
  roomCode: string,
  gameOptions: GameOptions
  started: boolean,
  trivia: {
    round: number,
    question: string,
    answer: string,
    answers: string[],
    sessionToken: string,
    submittedAnswers: number
  },
  hasWinner: boolean,
  winner: string,
  scorecard: Scorecard
}
