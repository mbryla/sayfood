import { useState, useEffect } from 'react';
import { mockRestaurants } from './mocks';

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
  tables: number;
  tableSize: number;
  openingTime: number;
  closingTime: number;
  reservationTimeMinutes: number;
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

export const useOccupancy = (restaurant: Restaurant, date: string) => {
  if (!(restaurant && date)) {
    return {};
  }

  // create empty occupancy array
  const occupancy: Record<string, number> = {};
  for (let time = restaurant.openingTime; time < restaurant.closingTime - restaurant.reservationTimeMinutes; time += 30) {
    if (time % 100 === 60) {
      time += 40; // hour flip
    }
    occupancy[formatTime(time)] = 0;
  }

  // fill in occupancy based on reservations
  const reservations = restaurant.reservations[date] || [];
  reservations.forEach(reservation => {
    for (let time = reservation.time; time < reservation.time + reservation.duration; time += 30) {
      if (time % 100 === 60) {
        time += 40; // hour flip
      }
      occupancy[formatTime(time)] += 1;
    }
  });

  return occupancy;
};

export const useBookTable = () => {
  const generateCode = (reservations: Array<Reservation>) => {
    const existingCodes = reservations.map(reservation => reservation.code);
    let code;
    do {
      code = `${Math.random()}`.substring(2, 6);
    } while (existingCodes.includes(code));
    return code;
  };

  const bookTable = (restaurant: Restaurant, date: string, time: string) =>
    new Promise(resolve => {
      setTimeout(() => {
        const reservationsMap: Record<string, Array<Reservation>> = mockRestaurants[restaurant.id].reservations;

        if (!Array.isArray(reservationsMap[date])) {
          reservationsMap[date] = [];
        }
        console.log('yyy pushing');
        reservationsMap[date].push({
          time: Number(time),
          duration: restaurant.reservationTimeMinutes,
          maximumNumberOfPeople: restaurant.tableSize,
          code: generateCode(reservationsMap[date]),
        });
        resolve();
      }, 300);
    });
  return bookTable;
};
