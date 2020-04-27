import { allDocs, arrayUnion, clearDocs, createDoc, docWithId, updateDoc } from './db';

export interface Booking {
  time: string;
  code: string;
}

export interface Restaurant {
  id: string;
  name: string;
  address: string;
  city: string;
  lat: number;
  lon: number;
  tables: number;
  tableSize: number;
  openingTime: string;
  closingTime: string;
  bookingDuration: number;
  bookings: Record<string, Array<Booking>>;
  safetyFeatures: string[];
}

export interface RestaurantData extends Restaurant, FirebaseFirestore.DocumentData {}

export const all = () => allDocs('restaurants');

export const clear = () => clearDocs('restaurants');

export const create = (resturant: Omit<Restaurant, 'id'>) => createDoc('restaurants', resturant);

export const withId = (id: string): Promise<RestaurantData> => docWithId('restaurants', id);

export const addBooking = (restaurantId: string, date: string, time: string) =>
  updateDoc('restaurants', restaurantId, {
    [`bookings.${date}`]: arrayUnion({
      time,
      code: `${Math.random()}`.substring(2, 6),
    }),
  });
