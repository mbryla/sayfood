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
    tables: 10,
    tableSize: 2,
    openingTime: '1700',
    closingTime: '2300',
    bookingDuration: 60,
    bookings: {},
  });
  await create({
    name: 'Antonio Mozzi',
    address: '75 Alcide de Gasperi Street',
    city: 'Brussels',
    tables: 15,
    tableSize: 2,
    openingTime: '1700',
    closingTime: '2300',
    bookingDuration: 90,
    bookings: {},
  });
  await create({
    name: 'Eat Me',
    address: '63 Schuman Street',
    city: 'Brussels',
    tables: 4,
    tableSize: 3,
    openingTime: '1700',
    closingTime: '2300',
    bookingDuration: 45,
    bookings: {},
  });
  await create({
    name: 'Cindirella',
    address: '88 Louise Weiss Street',
    city: 'Brussels',
    tables: 20,
    tableSize: 2,
    openingTime: '1700',
    closingTime: '2300',
    bookingDuration: 60,
    bookings: {},
  });
  await create({
    name: 'Sushi & Sushi',
    address: '19 Adenauer Street',
    city: 'Brussels',
    tables: 12,
    tableSize: 2,
    openingTime: '1700',
    closingTime: '2300',
    bookingDuration: 45,
    bookings: {},
  });
  res.normalized(200, { result: 'success' });
});

app.put('/:id', (req, res) => {
  const { id: restaurantId } = req.params || {};
  const restaurantUpdate = req.body || {};
  res.normalizedFromPromise(200, addBooking(restaurantId, restaurantUpdate.date, restaurantUpdate.time));
});

app.use(normalizedError);
