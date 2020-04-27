import * as cors from 'cors';
import * as express from 'express';
import { addBooking, all, clear, create } from '../db/Restaurant';
import { normalizedResponse, normalizedError } from '../handlers';

export const app = express();
app.use(cors({ origin: true }));
app.use(normalizedResponse);

app.get('/', (req, res) => {
  res.normalizedFromPromise(200, all());
});

app.get('/reset', async (req, res) => {
  await clear();
  await create({
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
  });
  await create({
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
  });
  await create({
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
  });
  await create({
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
  });
  await create({
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
  });
  res.normalized(200, { result: 'success' });
});

app.put('/:id', (req, res) => {
  const { id: restaurantId } = req.params || {};
  const restaurantUpdate = req.body || {};
  res.normalizedFromPromise(200, addBooking(restaurantId, restaurantUpdate.date, restaurantUpdate.time));
});

app.use(normalizedError);
