import { RestaurantsState, RestaurantActions, SET_RESTAURANTS } from './types';

const initialState: RestaurantsState = {
  byId: {},
};

export const restaurantsReducer = (state = initialState, action: RestaurantActions): RestaurantsState => {
  console.log('updating store', state, action);
  switch (action.type) {
    case SET_RESTAURANTS:
      return {
        byId: action.restaurants,
      };

    default:
      return state;
  }
};
