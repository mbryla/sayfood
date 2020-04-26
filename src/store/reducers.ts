import { RestaurantsState, RestaurantActions, SET_RESTAURANTS } from './types';

const initialState: RestaurantsState = {
  byId: {},
};

export const restaurantsReducer = (state = initialState, action: RestaurantActions): RestaurantsState => {
  switch (action.type) {
    case SET_RESTAURANTS:
      return {
        byId: action.restaurants,
      };

    default:
      return state;
  }
};
