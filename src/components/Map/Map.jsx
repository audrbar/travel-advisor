import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery, Box } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Rating from '@mui/material/Rating';

import mapStyles from './mapStyles';

const Map = ({ coords, places, setCoords, setBounds, setChildClicked, weatherData }) => {
  const matches = useMediaQuery('(min-width:600px)');
  const [mapLoaded, setMapLoaded] = React.useState(false);

  // Don't render map until we have valid coordinates
  if (!coords.lat && !coords.lng) {
    return <Box sx={{ height: '85vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading map...</Box>;
  }

  return (
    <Box sx={{ height: '85vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, libraries: ['places'] }}
        defaultCenter={coords}
        center={coords}
        defaultZoom={14}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={() => setMapLoaded(true)}
        margin={[50, 50, 50, 50]}
        options={(maps) => ({
          disableDefaultUI: true,
          zoomControl: true,
          styles: mapStyles
        })}
        onChange={(e) => {
          setCoords({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {places.length && places.map((place, i) => (
          <Box
            sx={{
              position: 'absolute',
              transform: 'translate(-50%, -50%)',
              zIndex: 1,
              '&:hover': { zIndex: 2 },
            }}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
          >
            {!matches
              ? <LocationOnOutlinedIcon color="primary" fontSize="large" />
              : (
                <Paper elevation={3} sx={{ padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100px' }}>
                  <Typography variant="subtitle2" gutterBottom> {place.name}</Typography>
                  <img
                    style={{ cursor: 'pointer' }}
                    src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                    alt={place.name}
                  />
                  <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />
                </Paper>
              )}
          </Box>
        ))}
        {weatherData?.list?.length && weatherData.list.map((data, i) => (
          <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
            <img src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`} height="100px" alt="weather" />
          </div>
        ))}
      </GoogleMapReact>
    </Box>
  );
};


export default Map;