import React, { ChangeEvent, FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRestaurant } from '../api/Restaurant';

const formatHours = (hours: number) => `${Math.round(hours / 100)}:${hours % 100 === 0 ? '00' : hours % 100}`;

interface RestaurantDetailsProps {}

interface ReservationsProps {
  date: string;
  openingHours: number;
  closingHours: number;
  reservedTime: number;
}

const Reservations: FC<ReservationsProps> = ({ openingHours, closingHours, reservedTime }) => {
  const hours: Array<number> = [];
  for (let hour: number = openingHours; hour + reservedTime <= closingHours; hour += 30) {
    if (hour % 100 === 60) {
      hour += 40;
    }

    hours.push(hour);
  }

  // todo filter hours based by already booked tokens

  const handleReserveButtonClick = () => {
    alert('a token will be generated');
    // todo create a token and store it in the restaurant reservations map
  };

  return (
    <ul>
      {hours.map(hour => (
        <li key={hour}>
          <p>{formatHours(hour)}</p>
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
        The restaurant is open from {formatHours(restaurant.openingHour)} to {formatHours(restaurant.closingHour)}.
      </p>
      <p>
        Your reservation will expire after {restaurant.reservationGraceTimeMinutes} minutes. You will have {restaurant.reservationTimeMinutes} minutes
        to consume your meal.
      </p>
      <input type="date" value={date} onChange={handleDateChange} />
      <p>At which time would you like to book a table?</p>
      <Reservations
        date={date}
        openingHours={restaurant.openingHour}
        closingHours={restaurant.closingHour}
        reservedTime={restaurant.reservationTimeMinutes}
      />
    </>
  );
};
