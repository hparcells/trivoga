    
import { createStore } from 'redux';

import rootReducer from './reducers';
import { Login } from './reducers/login-reducer';
import { Game } from './reducers/game-reducer';
import { Menu } from './reducers/menu-reducer';

const reduxDevTools = (window as any).__REDUX_DEVTOOLS_EXTENSION__;

const store = createStore(
  rootReducer,
  reduxDevTools ? reduxDevTools() : undefined,
);

export default store;

export interface Store {
  login: Login,
  game: Game,
  menu: Menu
}
