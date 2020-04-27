import { Restaurant } from './Restaurant';

export const mockRestaurants: Record<string, Restaurant> = {
  'fancy-food': {
    id: 'fancy-food',
    name: 'Fancy Food',
    address: '34 Paul-Henri Spaak Street',
    city: 'Brussels',
    lat: 50.852064,
    lon: 4.3705738,
    tables: 10,
    tableSize: 2,
    openingTime: '1700',
    closingTime: '2300',
    bookingDuration: 60,
    bookings: {},
    safetyFeatures: [
      "reduced table density",
      "ordering through app",
      "staff use disposable gloves",
      "sanitised tables",
    ]
  },
  'antonio-mozzi': {
    id: 'antonio-mozzi',
    name: 'Antonio Mozzi',
    address: '75 Alcide de Gasperi Street',
    city: 'Brussels',
    lat: 50.850528,
    lon: 4.3642143,
    tables: 15,
    tableSize: 2,
    openingTime: '1700',
    closingTime: '2300',
    bookingDuration: 90,
    bookings: {},
    safetyFeatures: []
  },
  'eat-me': {
    id: 'eat-me',
    name: 'Eat Me',
    address: '63 Schuman Street',
    city: 'Brussels',
    lat: 50.847791,
    lon: 4.3811333,
    tables: 4,
    tableSize: 3,
    openingTime: '1700',
    closingTime: '2300',
    bookingDuration: 45,
    bookings: {},
    safetyFeatures: []
  },
  cindirella: {
    id: 'cindirella',
    name: 'Cindirella',
    address: '88 Louise Weiss Street',
    city: 'Brussels',
    lat: 50.838787,
    lon: 4.3459963,
    tables: 20,
    tableSize: 2,
    openingTime: '1700',
    closingTime: '2300',
    bookingDuration: 60,
    bookings: {},
    safetyFeatures: []
  },
  'sushi-and-sushi': {
    id: 'sushi-and-sushi',
    name: 'Sushi & Sushi',
    address: '19 Adenauer Street',
    city: 'Brussels',
    lat: 50.841436,
    lon: 4.3720353,
    tables: 12,
    tableSize: 2,
    openingTime: '1700',
    closingTime: '2300',
    bookingDuration: 45,
    bookings: {},
    safetyFeatures: []
  },
};

export const mockMyRestaurantId = 'antonio-mozzi';