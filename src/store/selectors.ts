import { RootState } from '.';

export const restaurantsSelector = (state: RootState) => state.restaurants.byId || {};
