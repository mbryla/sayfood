import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@material-ui/core';

interface LandingPageProps {}

export const LandingPage: FC<LandingPageProps> = () => {
  return (
    <Box height="100vh" display="flex" flexDirection="row" alignItems="center" justifyContent="center">
      <Box p={5} height="200px" width="200px" textAlign="center">
        <Box marginTop="50%"><Link to="/booking">Booking app</Link></Box>
      </Box>
      <Box p={5} height="200px" width="200px" textAlign="center" >
        <Box marginTop="50%"><Link to="/myrestaurant">Restaurant app</Link> </Box>
      </Box>

    </Box>
  );
};
