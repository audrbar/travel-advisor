import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery, Box } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Rating from '@mui/material/Rating';

import mapStyles from '../../mapStyles';

// Wrapper components for map markers to avoid passing lat/lng to DOM
const MapMarker = ({ children }) => <div>{children}</div>;
const WeatherBox = ({ children }) => <div>{children}</div>;

const Map = ({ coords, places, setCoords, setBounds, setChildClicked, weatherData, setMapsApi }) => {
  const matches = useMediaQuery('(min-width:600px)');
  const [mapLoaded, setMapLoaded] = React.useState(false);

  // Handle Google API loaded
  const handleApiLoaded = ({ map, maps }) => {
    setMapLoaded(true);
    setMapsApi(maps);
  };

  // Don't render map until we have valid coordinates
  if (!coords.lat && !coords.lng) {
    return <Box sx={{ height: '85vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading map...</Box>;
  }

  return (
    <Box sx={{ height: '85vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, libraries: ['places', 'geometry'] }}
        center={coords}
        defaultZoom={14}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={handleApiLoaded}
        margin={[50, 50, 50, 50]}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          styles: mapStyles
        }}
        onChange={(e) => {
          setCoords({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {places.length && places.map((place, i) => (
          <MapMarker
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
          >
            <Box
              sx={{
                position: 'absolute',
                transform: 'translate(-50%, -50%)',
                zIndex: 1,
                '&:hover': { zIndex: 2 },
              }}
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
          </MapMarker>
        ))}
        {weatherData && (
          <WeatherBox
            lat={coords.lat}
            lng={coords.lng}
          >
            <Box
              sx={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                padding: '15px',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                minWidth: '200px'
              }}
            >
              <Typography variant="h6" gutterBottom>Weather</Typography>
              {weatherData.icon && (
                <img
                  src={`${weatherData.icon}.png`}
                  alt={weatherData.condition}
                  style={{ width: '64px', height: '64px' }}
                />
              )}
              <Typography variant="body1">{weatherData.condition}</Typography>
              <Typography variant="h5">
                {weatherData.temperature?.degrees}° {weatherData.temperature?.unit === 'CELSIUS' ? 'C' : 'F'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Feels like: {weatherData.feelsLike?.degrees}°
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Humidity: {weatherData.humidity}%
              </Typography>
            </Box>
          </WeatherBox>
        )}
      </GoogleMapReact>
    </Box>
  );
};


export default Map;