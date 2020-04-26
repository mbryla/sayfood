import { Restaurant } from '../api/Restaurant';

export interface RestaurantsState {
  byId: Record<string, Restaurant>;
}

export const SET_RESTAURANTS = 'SET_RESTAURANTS';

export interface SetRestaurantsAction {
  type: typeof SET_RESTAURANTS;
  restaurants: Record<string, Restaurant>;
}

export type RestaurantActions = SetRestaurantsAction;
