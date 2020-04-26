import React, { FC } from 'react';
import { useRestaurant } from '../../api/Restaurant';
import { mockMyRestaurantId } from '../../api/mocks';
import { Link } from 'react-router-dom';


export const MyRestaurantPage: FC<{}> = () => {

  const id = mockMyRestaurantId;
  const { isError, isLoading, restaurant } = useRestaurant(id || null);

  if(isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <header>{isError ? 'Error, please try again later' : restaurant?.name ?? ''}</header>
      <main>
        <div>
          {/* <Link to="/myrestaurant/create">Create a reservation</Link>
          <Link to="/myrestaurant/verify">Verify a reservation</Link>
          <Link to="/myrestaurant/cancel">Cancel a reservation</Link> */}
        </div>
      </main>
    </>
  );
}
