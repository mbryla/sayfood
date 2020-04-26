import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setRestaurants } from '../store/actions';
import { get } from './network';

const formatTime = (hours: number) => `${Math.round(hours / 100)}:${hours % 100 === 0 ? '00' : hours % 100}`;

export interface ReservationRequest {
  time: number; // army time system eg. 1230, 0050, 1930
  duration: number;
  maximumNumberOfPeople: number;
}

export interface Reservation extends ReservationRequest {
  code: string;
}

export interface Restaurant {
  id: string;
  name: string;
  address: string;
  city: string;
  tables: number;
  tableSize: number;
  openingTime: string;
  closingTime: string;
  bookingDuration: number;
  bookings: Record<string, Array<Reservation>>;
}

export const useRestaurants = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    dispatch(setRestaurants({}));

    get('/restaurants').then(response => {
      const restaurantsById: Record<string, Restaurant> = {};
      response.result.forEach((restaurant: Restaurant) => {
        restaurantsById[restaurant.id] = restaurant;
      });

      dispatch(setRestaurants(restaurantsById));
      setIsLoading(false);
      setIsError(false);
    });
  }, [dispatch]);

  return { isError, isLoading };
};

export const useOccupancy = (restaurant: Restaurant, date: string) => {
  if (!(restaurant && date)) {
    return {};
  }

  // create empty occupancy array
  const occupancy: Record<string, number> = {};
  for (let time = Number(restaurant.openingTime); time < Number(restaurant.closingTime) - restaurant.bookingDuration; time += 30) {
    if (time % 100 === 60) {
      time += 40; // hour flip
    }
    occupancy[formatTime(time)] = 0;
  }

  // fill in occupancy based on bookings
  const bookings = restaurant.bookings[date] || [];
  bookings.forEach(booking => {
    for (let time = Number(booking.time); time < Number(booking.time) + restaurant.bookingDuration; time += 30) {
      if (time % 100 === 60) {
        time += 40; // hour flip
      }
      occupancy[formatTime(time)] += 1;
    }
  });

  return occupancy;
};

export const useFreeTables = (restaurant: Restaurant, date: string) => {
  const occupancy = useOccupancy(restaurant, date);
  const freeTables: Record<string, number> = {};
  Object.keys(occupancy).filter(time => occupancy[time] < restaurant.tables).forEach(time => {
    freeTables[time] = restaurant.tables - occupancy[time];
  });
  return freeTables;
};
