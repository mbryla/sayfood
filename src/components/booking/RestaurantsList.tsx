import React, { FC, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams, RouteComponentProps, Route, Switch } from 'react-router-dom';
import { useRestaurants, Restaurant } from '../../api/Restaurant';
import { restaurantsSelector } from '../../store/selectors';

import { Typography, Grid, Box, MenuItem, MenuList, Paper, List, ListItem, Button, AppBar, Toolbar } from '@material-ui/core';
import { Person, CheckCircle, Close, ArrowBack } from '@material-ui/icons';
import { Map, Marker, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import { RestaurantBookingPageWrapper } from './RestaurantBooking';

interface RestaurantEntryProps {
  restaurant: Restaurant;
}

const RestaurantMenuEntry: FC<RestaurantEntryProps> = ({ restaurant }) => {
  return (
      <Box>
        <Typography variant="h6">
          {restaurant.name}
        </Typography>

        <Typography>{restaurant.address}</Typography>
      </Box>
  );
};

const RestaurantDetails: FC<{
  restaurant: Restaurant,
  onBook: () => void,
  onClose: () => void
}> = ({ restaurant, onBook, onClose }) => {
  return (
    <>
      <Box position="absolute" top={0} right={0} m={1}>
        <Button size="small" onClick={() => onClose()}>
          <Close />
        </Button>
      </Box>
      <Typography variant="h4">
        {restaurant.name}
      </Typography>
      <Box mt={2}>
        <Typography>{restaurant.address}</Typography>
        <Typography variant="subtitle1">{restaurant.tables} tables &times; {restaurant.tableSize} <Person fontSize="small"/></Typography>

      </Box>
      <Box mt={3} mb={1}>
        <Typography  variant="h6">Safety precautions</Typography>
        <List>
          {restaurant.safetyFeatures.map(x => 
            <ListItem><CheckCircle fontSize="small" style={{ marginRight: "0.5em"}} /> {x}</ListItem>
          )}
        </List>
      </Box>
      <Button color="primary" onClick={() => onBook()}>Book a table</Button>
      <Button color="secondary">Report a violation</Button>
    </>
  );
};

const defaultMarker = L.icon({
  iconUrl: '/marker-blue2x.png',
    iconSize: [25, 41],
    iconAnchor: [12.5, 20.5],
});
const selectedMarker = L.icon({
  iconUrl: '/marker-orange2x.png',
    iconSize: [25, 41],
    iconAnchor: [12.5, 20.5],
});

export const RestaurantsList: FC<RouteComponentProps<{id: string}>> = (props) => {
  const { isError, isLoading } = useRestaurants();
  const restaurants: Record<string, Restaurant> = useSelector(restaurantsSelector);
  const restaurantsArray = useMemo(() => Object.values(restaurants), [restaurants]);

  const { id } = useParams();

  const [ highlightedId, setHighlightedId ] = useState<string>();

  const selectedRestaurant = id && restaurantsArray?.filter(x => x.id === id)[0];

  const mapPosition = selectedRestaurant == undefined ?
    { lat: 50.8503, lng: 4.3517} :
    { lat: selectedRestaurant.lat, lng: selectedRestaurant.lon};

  if (isLoading) {
    return <p>Loading. Please wait...</p>;
  }

  if (isError) {
    return <p>Unexpected error occurred! Please try again later!</p>;
  }

  const selectRestaurant = (id: string | undefined) => {
    if(id == undefined) {
      props.history.push(`/booking/restaurants`);
    } else {
      props.history.push(`/booking/restaurants/${id}`);
    }
  };

  const bookAtRestaurant = (id: string) => {
    props.history.push(`/booking/restaurants/${id}/book`);
  }

  return (
    <Box height="100vh">
      <Grid container>
        <Grid item xs={4}>
          <Switch>
            <Route exact path="/booking/restaurants/:id?">
              <AppBar position="relative" style={{backgroundColor: '#ffa000'}}>
                <Toolbar>
                  <Typography variant="h4">
                  Certified Restaurants
                  </Typography>
                </Toolbar>
              </AppBar>
              <Box p={2}>
                <MenuList>
                  {restaurantsArray.map(restaurant => (
                    <MenuItem
                      selected={restaurant.id === id || restaurant.id === highlightedId}
                      
                      onClick={() => selectRestaurant(restaurant.id)}>
                      <RestaurantMenuEntry key={restaurant.id} restaurant={restaurant} />
                    </MenuItem>
                  ))}
                </MenuList>
              </Box>
            </Route>
            <Route exact path="/booking/restaurants/:id/book">
              <AppBar position="relative" style={{backgroundColor: '#ffa000'}}>
                <Toolbar>
                  <Typography variant="h4">
                    <Link to={`/booking/restaurants/${id}`}><ArrowBack style={{cursor: "pointer"}} /></Link> Book a Table
                  </Typography>
                </Toolbar>
              </AppBar>
              <RestaurantBookingPageWrapper id={id} />
            </Route>
          </Switch>
          
        </Grid>
        <Grid item xs={8}>
          <Box position="relative" height="100vh">
            <Map style={{height: "100%"}}
              center={mapPosition}
              zoom={14}
              zoomControl={false}
            >
              <TileLayer
                accessToken={"pk.eyJ1IjoibXo4aSIsImEiOiJjazlobGIza3Qwdmc2M2pvOTNkNDFyNHRiIn0.oFQk9Xb6LEeJmscoErx7Ag"}
                url="https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/{z}/{x}/{y}?access_token={accessToken}"
              />
              {
                restaurantsArray.map( r => 
                  <Marker
                    position={{lat: r.lat, lng: r.lon}}
                    onmouseover={() => setHighlightedId(r.id)}
                    onmouseout={() => setHighlightedId(undefined)}
                    onclick={() => selectRestaurant(r.id)}
                    icon={r.id === selectedRestaurant?.id ? defaultMarker : selectedMarker}
                  />
                )
              }
            </Map>
            {
              selectedRestaurant &&
                <Box bgcolor="primary" color="primary" position="absolute" top={0} left={0} zIndex={1000} m={2} width="300px">
                  <Paper elevation={3}>
                    <Box p={2} minHeight={100}>
                      <RestaurantDetails
                        restaurant={selectedRestaurant}
                        onBook={() => bookAtRestaurant(selectedRestaurant.id)}
                        onClose={() => selectRestaurant(undefined)}
                    />
                    </Box>
                  </Paper>
                </Box>
            }
          </Box>
        </Grid>
      </Grid>
      
    </Box>
  );
};
