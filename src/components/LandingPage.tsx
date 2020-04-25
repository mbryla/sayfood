import React, { FC } from 'react';
import { Link } from 'react-router-dom';

interface LandingPageProps {}

export const LandingPage: FC<LandingPageProps> = () => {
  return (
    <div>
      <p>
        <Link to="/restaurants">restaurants</Link>
      </p>
      <p>
        <Link to="/verification">verification</Link>
      </p>
    </div>
  );
};
