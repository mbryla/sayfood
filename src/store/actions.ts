import { ThunkAction } from 'redux-thunk';
import { Restaurant } from '../api/Restaurant';
import { SetRestaurantsAction, SET_RESTAURANTS, RestaurantsState } from './types';

export const setRestaurants = (restaurants: Record<string, Restaurant>): SetRestaurantsAction => ({
  type: SET_RESTAURANTS,
  restaurants,
});

export const bookTable = (
  restaurants: Record<string, Restaurant>
): ThunkAction<void, RestaurantsState, unknown, SetRestaurantsAction> => async dispatch => {
  dispatch(setRestaurants(restaurants));
};
