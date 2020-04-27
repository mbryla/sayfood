import { RestaurantsState, RestaurantActions, SET_RESTAURANTS, SET_CODE } from './types';

const initialState: RestaurantsState = {
  byId: {},
  code: '',
};

export const restaurantsReducer = (state = initialState, action: RestaurantActions): RestaurantsState => {
  console.log('updating store', state, action);
  switch (action.type) {
    case SET_RESTAURANTS:
      return {
        ...state,
        byId: action.restaurants,
      };

    case SET_CODE:
      return {
        ...state,
        code: action.code,
      };

    default:
      return state;
  }
};
