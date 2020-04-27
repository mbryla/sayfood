import { Restaurant } from '../api/Restaurant';

export interface RestaurantsState {
  byId: Record<string, Restaurant>;
  code: string;
}

export const SET_RESTAURANTS = 'SET_RESTAURANTS';
export const SET_CODE = 'SET_CODE';

export interface SetRestaurantsAction {
  type: typeof SET_RESTAURANTS;
  restaurants: Record<string, Restaurant>;
}

export interface SetCodeAction {
  type: typeof SET_CODE;
  code: string;
}

export type RestaurantActions = SetRestaurantsAction | SetCodeAction;
