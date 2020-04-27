import React, { FC, useState } from 'react';
import { useRestaurants } from '../../api/Restaurant';
import { RouteComponentProps } from 'react-router-dom';
import { Input, Button, FormGroup, Box, Toolbar, Typography, AppBar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { ArrowBack } from '@material-ui/icons';

export const MyRestaurantPage: FC<RouteComponentProps> = props => {
  const { isLoading } = useRestaurants();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <AppBar style={{ backgroundColor: '#01579b' }}>
        <Toolbar>
          <img src="/sayfood-logo.png" style={{ height: '100px' }} alt="logo"></img>
          <Typography variant="h4">Welcome</Typography>
        </Toolbar>
      </AppBar>
      <Box mt={5} display="flex" flexDirection="column" alignItems="center">
        <Box mt={20}>
          <Button color="primary" onClick={() => props.history.push('/myrestaurant/verify')}>
            Verify a reservation
          </Button>
        </Box>
        <Box mt={10}>
          <Button color="secondary" onClick={() => props.history.push('/myrestaurant/cancel')}>
            Cancel a reservation
          </Button>
        </Box>
      </Box>
    </>
  );
};

export const ReservationCodeSubmissionPage: FC<{
  actionUrl: string;
  placeholderText: string;
  buttonText: string;
  successText: string;
  onBack: () => void;
}> = ({ actionUrl, placeholderText, buttonText, successText, onBack }) => {
  let [isLoading, setIsLoading] = useState<boolean>(false);
  let [isSuccess, setIsSuccess] = useState<boolean>(false);

  return (
    <Box width="300px" margin="0px auto">
      <Button onClick={() => onBack()}>
        <ArrowBack fontSize="small" /> Back
      </Button>
      <FormGroup style={{ display: 'flex', flexDirection: 'column', justifyItems: 'center', textAlign: 'center' }}>
        <Box mt={5}>
          <Input type="text" placeholder={placeholderText} inputProps={{ style: { textAlign: 'center' } }}></Input>
        </Box>
        <Box mt={4}>
          <Button
            disabled={isLoading}
            onClick={e => {
              e.preventDefault();

              setIsLoading(true);
              setIsSuccess(false);

              setTimeout(() => {
                setIsLoading(false);
                setIsSuccess(true);
              }, 1000);
            }}
          >
            {buttonText}
          </Button>
        </Box>
        <Box>
          {isLoading && <p>Processing...</p>}
          {isSuccess && <Alert severity="success">{successText}</Alert>}
        </Box>
      </FormGroup>
    </Box>
  );
};

export const VerifyReservation: FC<RouteComponentProps> = props => {
  return (
    <ReservationCodeSubmissionPage
      actionUrl="" //TODO
      placeholderText="Enter reservation code here"
      buttonText="Verify"
      successText="Reservation succesfully verified!"
      onBack={() => props.history.push('/myrestaurant')}
    />
  );
};

export const CancelReservation: FC<RouteComponentProps> = props => {
  return (
    <ReservationCodeSubmissionPage
      actionUrl="" //TODO
      placeholderText="Enter reservation code here"
      buttonText="Cancel"
      successText="Reservation succesfully cancelled"
      onBack={() => props.history.push('/myrestaurant')}
    />
  );
};
