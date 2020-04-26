import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRestaurants, useOccupancy, Restaurant, useBookTable } from '../api/Restaurant';
import { useSelector } from 'react-redux';
import { restaurantsSelector } from '../store/selectors';

const formatHours = (hours: number) => `${Math.round(hours / 100)}:${hours % 100 === 0 ? '00' : hours % 100}`;

interface RestaurantDetailsProps {}

interface ReservationsProps {
  date: string;
  restaurant: Restaurant;
}

const Reservations: FC<ReservationsProps> = ({ date, restaurant }) => {
  const bookTable = useBookTable();
  const occupancy = useOccupancy(restaurant, date);
  const times = Object.keys(occupancy);
  const freeTables = times.filter(time => occupancy[time] < restaurant.tables);
  const [bookingTime, setBookingTime] = useState(freeTables.length ? freeTables[0] : undefined);

  useEffect(() => {
    setBookingTime(freeTables.length ? freeTables[0] : undefined);
  }, [freeTables]);

  const handleTimeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setBookingTime(event.target.value);
  };

  const handleReserveButtonClick = () => {
    setBookingTime(freeTables.length ? freeTables[0] : undefined);
    bookTable(restaurant, date, bookingTime as string);
    // todo create a token and store it in the restaurant reservations map
  };

  return (
    <>
      <select id="time" name="time" value={bookingTime} onChange={handleTimeChange}>
        {freeTables.map(time => (
          <option key={time} value={time}>
            {time} - {restaurant.tables - occupancy[time]} free tables
          </option>
        ))}
      </select>
      <button onClick={handleReserveButtonClick}>book a table</button>
    </>
  );
};

export const RestaurantDetails: FC<RestaurantDetailsProps> = () => {
  const { isError, isLoading } = useRestaurants();
  const { id } = useParams();
  const restaurants = useSelector(restaurantsSelector);
  const restaurant = id ? restaurants[id] : null;
  const [date, setDate] = useState<string>(new Date().toISOString().substring(0, 10));

  if (isLoading) {
    return <p>Loading. Please wait...</p>;
  }

  if (isError || !restaurant) {
    return <p>Unexpected error occurred! Please try again later!</p>;
  }

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  return (
    <>
      <h2>{restaurant.name}</h2>
      <p>{restaurant.address}</p>
      <p>
        This restaurant safely offers {restaurant.tables} tables {restaurant.tableSize} people each.
      </p>
      <p>
        The restaurant is open from {formatHours(restaurant.openingTime)} to {formatHours(restaurant.closingTime)}.
      </p>
      <p>You will have {restaurant.reservationTimeMinutes} minutes to consume your meal.</p>
      <input type="date" value={date} onChange={handleDateChange} />
      <p>At which time would you like to book a table?</p>
      <Reservations date={date} restaurant={restaurant} />
    </>
  );
};
