import { MeunuActionObject } from "../actions";

export type Difficulty = 'any' | 'easy' | 'medium' | 'hard';
export type Type = 'any' | 'multiple' | 'boolean';
export type CategoryId = 'any' | '9' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20' | '21' | '22' | '23' | '24' | '25' | '26' | '27' | '28' | '29' | '30' | '31' | '32';
export type Category = 'Any Category' | 'eneral Knowledge' | 'Entertainment: Books' | 'Entertainment: Film' | 'Entertainment: Music' | 'Entertainment: Musicals and Theatres' | 'Entertainment: Television' | 'Entertainment: Video Games' | 'Entertainment: Board Games' | 'Science and Nature' | 'Science: Computers' | 'Science: Mathematics' | 'Mythology' | 'Sports' | 'Geography' | 'History' | 'Politics' | 'Art' | 'Celebrities' | 'Animals' | 'Vehicles' | 'Entertainment: Comics' | 'Science: Gadgets' | 'Entertainment: Japanese Anime and Manga' | 'Entertainment: Cartoon and Animations';

export interface Menu {
  creationWindowOpen: boolean,
  difficulty: Difficulty,
  type: Type,
  category: CategoryId
}

const initialState: Menu = {
  creationWindowOpen: false,
  difficulty: 'any',
  type: 'any',
  category: 'any'
}

export default function(state: Menu = initialState, action: MeunuActionObject) {
  if(action.type === 'TOGGLE_CREATION_WINDOW') {
    const newState = { ...state };

    newState.creationWindowOpen = !newState.creationWindowOpen;

    return newState;
  }
  if(action.type === 'CHANGE_DIFFICULTY') {
    const newState = { ...state };

    newState.difficulty = action.difficulty;
    return newState;
  }

  return state;
}
