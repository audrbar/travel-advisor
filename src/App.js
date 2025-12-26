import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid, Box, CircularProgress, Typography } from '@mui/material';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';

import { getPlacesData, getWeatherData } from './api/travelAdvisorAPI';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';

const App = () => {
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');

  const [coords, setCoords] = useState(null); // Start with null to indicate no location yet
  const [bounds, setBounds] = useState(null);

  const [weatherData, setWeatherData] = useState(null);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [places, setPlaces] = useState([]);

  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [locationLoading, setLocationLoading] = useState(true);

  // Store Google Maps API
  const [mapsApi, setMapsApi] = useState(null);

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          setCoords({ lat: latitude, lng: longitude });
          setLocationLoading(false);
        },
        (error) => {
          console.log('Geolocation error:', error.message);
          // Fall back to London if geolocation fails
          setCoords({ lat: 51.5074, lng: -0.1278 });
          setLocationLoading(false);
        }
      );
    } else {
      // Geolocation not supported, use default location
      setCoords({ lat: 51.5074, lng: -0.1278 });
      setLocationLoading(false);
    }
  }, []);

  useEffect(() => {
    const filtered = places?.filter((place) => Number(place.rating) > rating);

    setFilteredPlaces(filtered);
  }, [rating, places]);

  // Fetch places data with debouncing to avoid rate limits
  useEffect(() => {
    if (bounds && mapsApi && coords) {
      const timeoutId = setTimeout(() => {
        setIsLoading(true);
        setError(null);

        // Fetch weather data for current location
        getWeatherData(coords.lat, coords.lng)
          .then((data) => {
            if (data) {
              setWeatherData(data);
            }
          })
          .catch((error) => {
            console.error('Weather fetch error:', error);
          });

        getPlacesData(type, bounds.sw, bounds.ne, mapsApi)
          .then((data) => {
            setPlaces(data?.filter((place) => place.name && place.num_reviews > 0) || []);
            setFilteredPlaces([]);
            setRating('');
            setIsLoading(false);
          })
          .catch((error) => {
            setIsLoading(false);
            if (error.message === 'RATE_LIMIT_EXCEEDED') {
              setError('Rate limit exceeded. Please wait a moment and try again.');
            } else {
              setError('Failed to load places. Please ensure Places API is enabled in your Google Cloud Console.');
            }
          });
      }, 500); // 500ms debounce delay

      return () => clearTimeout(timeoutId);
    }
  }, [bounds, type, mapsApi, coords]);

  // Show loading screen while getting user location
  if (locationLoading) {
    return (
      <>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f5f5f5',
            gap: 3,
          }}
        >
          <LocationSearchingIcon sx={{ fontSize: 80, color: '#1976d2', animation: 'pulse 2s infinite' }} />
          <CircularProgress size={60} thickness={4} />
          <Typography variant="h5" sx={{ color: '#555', fontWeight: 500 }}>
            Finding your location...
          </Typography>
          <Typography variant="body1" sx={{ color: '#777' }}>
            Please allow location access to get started
          </Typography>
        </Box>
        <style>
          {`
            @keyframes pulse {
              0%, 100% { opacity: 1; transform: scale(1); }
              50% { opacity: 0.6; transform: scale(1.1); }
            }
          `}
        </style>
      </>
    );
  }

  return (
    <>
      <CssBaseline />
      <Header setCoords={setCoords} mapsApi={mapsApi} />
      {error && (
        <div style={{ padding: '20px', backgroundColor: '#f44336', color: 'white', textAlign: 'center' }}>
          {error}
        </div>
      )}
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List
            isLoading={isLoading}
            childClicked={childClicked}
            places={filteredPlaces.length ? filteredPlaces : places}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Map
            setChildClicked={setChildClicked}
            setBounds={setBounds}
            setCoords={setCoords}
            coords={coords}
            places={filteredPlaces.length ? filteredPlaces : places}
            weatherData={weatherData}
            setMapsApi={setMapsApi}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;