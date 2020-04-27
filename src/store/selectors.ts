import { RootState } from '.';

export const restaurantsSelector = (state: RootState) => state.restaurants.byId || {};

export const codeSelector = (state: RootState) => state.restaurants.code;
