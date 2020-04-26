import React, { ChangeEvent, FC, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Restaurant, useFreeTables } from '../api/Restaurant';
import { useSelector, useDispatch } from 'react-redux';
import { restaurantsSelector } from '../store/selectors';
import { bookTable } from '../store/actions';

const formatHours = (hours: number) => `${Math.floor(hours / 100)}:${hours % 100 === 0 ? '00' : hours % 100}`;

interface TimePickerProps {
  restaurantId: string;
  freeTables: Record<string, number>;
  date: string;
}
export const TimePicker: FC<TimePickerProps> = ({ restaurantId, freeTables, date }) => {
  const dispatch = useDispatch();
  const [bookingTime, setBookingTime] = useState<string>(Object.keys(freeTables)[0]);
  const bookableSlots = Object.keys(freeTables).filter(
    time => time >= formatHours(new Date().getHours() * 100 + new Date().getMinutes()).replace(/:/, '')
  );

  const handleTimeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setBookingTime(event.target.value);
  };

  const handleReserveButtonClick = () => {
    dispatch(bookTable(restaurantId, date, bookingTime.replace(/:/, '')));
  };

  console.log('rendering TimePicker', restaurantId, freeTables, date, bookingTime, bookableSlots);

  return (
    <>
      <select id="time" name="time" value={bookingTime} onChange={handleTimeChange}>
        {bookableSlots.map(time => (
          <option key={time} value={time}>
            {time} - {freeTables[time]} free tables
          </option>
        ))}
      </select>
      <button onClick={handleReserveButtonClick}>book a table</button>
    </>
  );
};

interface BookingPanelProps {
  restaurant: Restaurant;
}
export const BookingPanel: FC<BookingPanelProps> = ({ restaurant }) => {
  const [date, setDate] = useState<string>(new Date().toISOString().substring(0, 10));
  const freeTables = useFreeTables(restaurant, date);

  const inThePast = date < new Date().toISOString().substring(0, 10);
  const noFreeTables = Object.keys(freeTables).length === 0;

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  console.log('rendering BookingPanelProps', date, freeTables, inThePast, noFreeTables);

  return (
    <>
      <input type="date" value={date} onChange={handleDateChange} />
      {inThePast && <p>You cannot book a table in the past!</p>}
      {!inThePast && noFreeTables && <p>There are no more free tables at this day!</p>}
      {!inThePast && !noFreeTables && (
        <>
          <p>At which time would you like to book a table?</p>
          <TimePicker restaurantId={restaurant.id} freeTables={freeTables} date={date} />
        </>
      )}
    </>
  );
};

interface RestaurantDetailsPageProps {}
export const RestaurantDetailsPage: FC<RestaurantDetailsPageProps> = () => {
  const { id } = useParams();
  const restaurants = useSelector(restaurantsSelector);
  const restaurant = useMemo(() => (id ? restaurants[id] : null), [id, restaurants]);

  console.log('rendering RestaurantDetailsPage', id, restaurants, restaurant);

  if (!restaurant) {
    return <p>Not found</p>;
  }

  return (
    <>
      <h2>{restaurant.name}</h2>
      <p>{restaurant.address}</p>
      <p>
        This restaurant safely offers {restaurant.tables} tables {restaurant.tableSize} people each.
      </p>
      <p>
        The restaurant is open from {formatHours(Number(restaurant.openingTime))} to {formatHours(Number(restaurant.closingTime))}.
      </p>
      <p>You will have {restaurant.bookingDuration} minutes to consume your meal.</p>
      <BookingPanel restaurant={restaurant} />
    </>
  );
};
