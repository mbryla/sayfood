import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useRestaurants, Restaurant } from '../api/Restaurant';
import { restaurantsSelector } from '../store/selectors';

interface RestaurantsListProps {}

interface RestaurantEntryProps {
  restaurant: Restaurant;
}

const RestaurantEntry: FC<RestaurantEntryProps> = ({ restaurant }) => {
  return (
    <li>
      <p>
        <Link to={`/restaurants/${restaurant.id}`}>{restaurant.name}</Link>
      </p>
      <p>{restaurant.address}</p>
    </li>
  );
};

export const RestaurantsList: FC<RestaurantsListProps> = () => {
  const { isError, isLoading } = useRestaurants();
  const restaurants: Record<string, Restaurant> = useSelector(restaurantsSelector);
  const restaurantsArray = useMemo(() => Object.values(restaurants), [restaurants]);

  if (isLoading) {
    return <p>Loading. Please wait...</p>;
  }

  if (isError) {
    return <p>Unexpected error occurred! Please try again later!</p>;
  }

  return (
    <>
      <h2>List of certified restaurants</h2>
      <ul>
        {restaurantsArray.map(restaurant => (
          <RestaurantEntry key={restaurant.id} restaurant={restaurant} />
        ))}
      </ul>
    </>
  );
};
