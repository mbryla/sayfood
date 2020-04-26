import React, { FC } from 'react';
import { Link } from 'react-router-dom';

interface LandingPageProps {}

export const LandingPage: FC<LandingPageProps> = () => {
  return (
    <div>
      <p>
        <Link to="/booking">Booking app</Link>
      </p>
      <p>
        <Link to="/myrestaurant">Restaurant app</Link>
      </p>
      <p>
        <Link to="/government" style={{ pointerEvents: "none"}} onClick={e => e.preventDefault()}>Government view</Link>
      </p>

    </div>
  );
};
