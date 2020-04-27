import { ThunkAction } from 'redux-thunk';
import { Restaurant } from '../api/Restaurant';
import { SetRestaurantsAction, SET_RESTAURANTS, RestaurantsState } from './types';
import { get, put } from '../api/network';

export const setRestaurants = (restaurants: Record<string, Restaurant>): SetRestaurantsAction => ({
  type: SET_RESTAURANTS,
  restaurants,
});

export const bookTable = (
  restaurantId: string,
  date: string,
  time: string
): ThunkAction<void, RestaurantsState, unknown, SetRestaurantsAction> => async dispatch => {
  console.log('booking table', restaurantId, date, time);
  await put(`/restaurants/${restaurantId}`, {
    date,
    time,
  });
  const restaurants = await get('/restaurants');
  const restaurantsById: Record<string, Restaurant> = {};
  restaurants.result.forEach((restaurant: Restaurant) => {
    restaurantsById[restaurant.id] = restaurant;
  });

  const action = setRestaurants(restaurantsById);
  console.log('dispatching', action);
  dispatch(action);

  
  //   get('/restaurants').then(response => {
  //     const restaurantsById: Record<string, Restaurant> = {};
  //     response.result.forEach((restaurant: Restaurant) => {
  //       restaurantsById[restaurant.id] = restaurant;
  //     });

  //     dispatch(setRestaurants(restaurantsById));
  //   }).catch(error => {
  //     console.log('error get', error);
  //   });
  // }).catch(error => {
  //   console.log('error put', error);
  // });
};
