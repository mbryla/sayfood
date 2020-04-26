import React, { ChangeEvent, FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRestaurant, useOccupancy, Restaurant } from '../api/Restaurant';

const formatHours = (hours: number) => `${Math.round(hours / 100)}:${hours % 100 === 0 ? '00' : hours % 100}`;

interface RestaurantDetailsProps {}

interface ReservationsProps {
  date: string;
  restaurant: Restaurant;
}

const Reservations: FC<ReservationsProps> = ({ date, restaurant }) => {
  const occupancy = useOccupancy(restaurant, date);

  const handleReserveButtonClick = () => {
    console.log('generate token');
    alert('a token will be generated');
    // todo create a token and store it in the restaurant reservations map
  };

  return (
    <ul>
      {Object.keys(occupancy).map(time => (
        <li key={time}>
          <p>time - {restaurant.tables - occupancy[time]} free tables</p>
          <button onClick={handleReserveButtonClick}>book a table</button>
        </li>
      ))}
    </ul>
  );
};

export const RestaurantDetails: FC<RestaurantDetailsProps> = () => {
  const { id } = useParams();
  const { isError, isLoading, restaurant } = useRestaurant(id || null);
  const [date, setDate] = useState<string>(new Date().toISOString().substring(0, 10));

  if (isLoading) {
    return <p>Loading. Please wait...</p>;
  }

  if (isError || restaurant === null) {
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
      <p>
        You will have {restaurant.reservationTimeMinutes} minutes
        to consume your meal.
      </p>
      <input type="date" value={date} onChange={handleDateChange} />
      <p>At which time would you like to book a table?</p>
      <Reservations date={date} restaurant={restaurant} />
    </>
  );
};
