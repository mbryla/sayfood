import { combineReducers } from 'redux';
import { restaurantsReducer } from './reducers';

export const rootReducer = combineReducers({
  restaurants: restaurantsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
