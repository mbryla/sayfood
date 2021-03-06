import React, { ChangeEvent, FC, useMemo, useState } from 'react';
import { Restaurant, useFreeTables, useRestaurants } from '../../api/Restaurant';
import { useSelector, useDispatch } from 'react-redux';
import { restaurantsSelector, codeSelector } from '../../store/selectors';
import { bookTable } from '../../store/actions';
import { Box, Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const formatHours = (hours: number) => `${Math.floor(hours / 100)}:${hours % 100 === 0 ? '00' : hours % 100}`;

interface TimePickerProps {
  restaurantId: string;
  freeTables: Record<string, number>;
  date: string;
}
export const TimePicker: FC<TimePickerProps> = ({ restaurantId, freeTables, date }) => {
  const dispatch = useDispatch();
  const [bookingTime, setBookingTime] = useState<string>(Object.keys(freeTables)[0]);
  console.log('freetables', freeTables);
  const bookableSlots = Object.keys(freeTables);

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
      <Button color="primary" onClick={handleReserveButtonClick}>
        Confirm booking
      </Button>
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

interface RestaurantBookingPageProps {
  id: string;
}
export const RestaurantBookingPage: FC<RestaurantBookingPageProps> = ({ id }) => {
  const restaurants = useSelector(restaurantsSelector);
  const code = useSelector(codeSelector);
  const restaurant = useMemo(() => (id ? restaurants[id] : null), [id, restaurants]);

  console.log('rendering RestaurantDetailsPage', id, restaurants, restaurant);

  if (!restaurant) {
    return <p>Not found</p>;
  }

  return (
    <Box p={2}>
      <p>
        This restaurant safely offers {restaurant.tables} tables {restaurant.tableSize} people each.
      </p>
      <p>
        The restaurant is open from {formatHours(Number(restaurant.openingTime))} to {formatHours(Number(restaurant.closingTime))}.
      </p>
      <p>You will have {restaurant.bookingDuration} minutes to consume your meal.</p>
      <BookingPanel restaurant={restaurant} />
      {code && (
        <Box>
          <Alert severity="success">Table booked! Your reservation code is: {code}</Alert>
        </Box>
      )}
    </Box>
  );
};

export const RestaurantBookingPageWrapper: FC<{ id: string }> = ({ id }) => {
  const { isError, isLoading } = useRestaurants();

  if (isLoading) {
    return <p>Loading. Please wait...</p>;
  }

  if (isError) {
    return <p>Unexpected error occurred! Please try again later!</p>;
  }

  return <RestaurantBookingPage id={id} />;
};
