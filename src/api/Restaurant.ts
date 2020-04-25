import { useState, useEffect } from 'react';
import { mockRestaurants } from './mocks';

export interface Reservation {
  time: string,
  numberOfPeople: number,
}

export interface Restaurant {
  id: string;
  name: string;
  address: string;
  tables: number;
  tableSize: number;
  openingHour: number;
  closingHour: number;
  reservationTimeMinutes: number;
  reservationGraceTimeMinutes: number;
  reservations: Record<string, Array<Reservation>>;
}

export const useRestaurants = () => {
  const [restaurants, setRestaurants] = useState<Record<string, Restaurant>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setRestaurants({});

    setTimeout(() => {
      setRestaurants(mockRestaurants);
      setIsLoading(false);
      setIsError(false);
    }, 300);
  }, []);

  return { isError, isLoading, restaurants };
};

export const useRestaurant = (id: string | null) => {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    if (id === null) {
      setIsLoading(false);
      setIsError(false);
      setRestaurant(null);
    } else {
      setIsLoading(true);
      setIsError(false);
      setRestaurant(null);

      setTimeout(() => {
        setRestaurant(mockRestaurants[id]);
        setIsLoading(false);
        setIsError(false);
      }, 300);
    }
  }, [id]);

  return { isError, isLoading, restaurant };
};
