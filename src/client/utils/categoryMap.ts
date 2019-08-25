import { CategoryId, Category } from "../reducers/menu-reducer";

const categories: Category[] = [
  'Any Category',
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

export function getCategoryNameFromId(id: CategoryId): Category {
  return categories[Number(id)];
}
