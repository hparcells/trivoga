import React from 'react';
import { connect } from 'react-redux';

import { Store } from '../../store';
import { changeDifficulty, changeType, changeCategory, createRoom } from '../../actions';
import { Difficulty, Type, CategoryId } from '../../reducers/menu-reducer';
import { GameOptions } from '../../../shared/types';

function CreationWindow(
  {
    difficulty,
    type,
    category,
    changeDifficulty,
    changeType,
    changeCategory,
    createRoom
  }:
  {
    difficulty: Difficulty,
    type: Type,
    category: CategoryId,
    changeDifficulty: (difficulty: Difficulty) => void,
    changeType: (newType: Type) => void,
    changeCategory: (category: CategoryId) => void,
    createRoom: (gameOptions: GameOptions) => void
  }
) {
  function handleDifficultyChange(event: any) {
    changeDifficulty(event.target.value);
  }
  function handleChangeType(event: any) {
    changeType(event.target.value);
  }
  function handleChangeCategory(event: any) {
    changeCategory(event.target.value);
  }
  function handleCreateRoom() {
    createRoom({ difficulty, type, category })
  }

  return (
    <div>
      <div>
        <span>Difficulty:
          <select value={difficulty} onChange={handleDifficultyChange}>
            <option value='any'>Any</option>
            <option value='easy'>Easy</option>
            <option value='medium'>Medium</option>
            <option value='hard'>Hard</option>
          </select>
        </span>
      </div>
     <div>
      <span>Type:
        <select value={type} onChange={handleChangeType}>
          <option value='any'>Any</option>
          <option value='multiple'>Multiple Choice</option>
          <option value='boolean'>True and False</option>
        </select>
      </span>
     </div>
      <div>
        <span>Category:
          <select value={category} onChange={handleChangeCategory}>
            <option value='any'>Any Category</option>
            <option value='9'>General Knowledge</option>
            <option value='10'>Entertainment: Books</option>
            <option value='11'>Entertainment: Film</option>
            <option value='12'>Entertainment: Music</option>
            <option value='13'>Entertainment: Musicals and Theatres</option>
            <option value='14'>Entertainment: Television</option>
            <option value='15'>Entertainment: Video Games</option>
            <option value='16'>Entertainment: Board Games</option>
            <option value='17'>Science and Nature</option>
            <option value='18'>Science: Computers</option>
            <option value='19'>Science: Mathematics</option>
            <option value='20'>Mythology</option>
            <option value='21'>Sports</option>
            <option value='22'>Geography</option>
            <option value='23'>History</option>
            <option value='24'>Politics</option>
            <option value='25'>Art</option>
            <option value='26'>Celebrities</option>
            <option value='27'>Animals</option>
            <option value='28'>Vehicles</option>
            <option value='29'>Entertainment: Comics</option>
            <option value='30'>Science: Gadgets</option>
            <option value='31'>Entertainment: Japanese Anime and Manga</option>
            <option value='32'>Entertainment: Cartoon and Animations</option>
          </select>
        </span>
      </div>
      <button onClick={handleCreateRoom}>Go!</button>
    </div>
  )
}

const mapStateToProps = (state: Store) => ({
  difficulty: state.menu.difficulty,
  type: state.menu.type,
  category: state.menu.category
});
const mapDispatchToProps = {
  changeDifficulty,
  changeType,
  changeCategory,
  createRoom
};

export default connect(mapStateToProps, mapDispatchToProps)(CreationWindow);
