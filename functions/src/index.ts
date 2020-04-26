/* eslint-disable import/first */
import { initializeApp } from 'firebase-admin';
import { https } from 'firebase-functions';
initializeApp();

import { app as restaurantsHandler } from './api/restaurants';

export const restaurants = https.onRequest(restaurantsHandler);
