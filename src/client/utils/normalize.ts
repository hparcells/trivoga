import { capitalize } from '@reverse/string';

import { CategoryId, Category, Difficulty, Type } from '../reducers/menu-reducer';

const categories: Category[] = [
  'eneral Knowledge',
  'Entertainment: Books',
  'Entertainment: Film',
  'Entertainment: Music',
  'Entertainment: Musicals and Theatres',
  'Entertainment: Television',
  'Entertainment: Video Games',
  'Entertainment: Board Games',
  'Science and Nature',
  'Science: Computers',
  'Science: Mathematics',
  'Mythology',
  'Sports',
  'Geography',
  'History',
  'Politics',
  'Art',
  'Celebrities',
  'Animals',
  'Vehicles',
  'Entertainment: Comics',
  'Science: Gadgets',
  'Entertainment: Japanese Anime and Manga',
  'Entertainment: Cartoon and Animations',
];

export function normalizeCategoryId(id: CategoryId): Category {
  if(id === 'any') {
    return 'Any Category';
  }

  return categories[Number(id) - 9];
}
export function normalizeDifficulty(difficulty: Difficulty): string {
  if(difficulty === 'any') {
    return 'Any Difficulty';
  }

  return capitalize(difficulty);
}
export function normalizeType(type: Type): string {
  if(type === 'any') {
    return 'Any Type';
  }
  if(type === 'boolean') {
    return 'True / False';
  }
  if(type === 'multiple') {
    return 'Multiple Choice';
  }

  return 'Unknown Type';
}
