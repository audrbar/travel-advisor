import React, { useEffect, useRef } from 'react';
import { AppBar, Toolbar, Typography, Box, InputBase, alpha } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

const Header = ({ setCoords, mapsApi }) => {
  const autocompleteRef = useRef(null);
  const autocompleteInstanceRef = useRef(null);

  useEffect(() => {
    if (mapsApi && autocompleteRef.current && !autocompleteInstanceRef.current) {
      // Use the new PlaceAutocompleteElement (recommended since March 2025)
      const autocompleteElement = new mapsApi.places.PlaceAutocompleteElement();

      // Set placeholder attribute
      autocompleteElement.setAttribute('placeholder', 'Search location...');

      // Listen for place selection - use gmp-select event
      autocompleteElement.addEventListener('gmp-select', async (event) => {
        const placePrediction = event.placePrediction;

        if (!placePrediction) return;

        try {
          // Convert prediction to place
          const place = placePrediction.toPlace();

          // Fetch place details
          await place.fetchFields({
            fields: ['location', 'displayName', 'formattedAddress'],
          });

          // Access the location
          if (place.location) {
            const lat = typeof place.location.lat === 'function' ? place.location.lat() : place.location.lat;
            const lng = typeof place.location.lng === 'function' ? place.location.lng() : place.location.lng;

            setCoords({ lat, lng });
          }
        } catch (error) {
          console.error('Error fetching place details:', error);
        }
      });

      // Clear the container and append the web component
      autocompleteRef.current.innerHTML = '';
      autocompleteRef.current.appendChild(autocompleteElement);
      autocompleteInstanceRef.current = autocompleteElement;
    }
  }, [mapsApi, setCoords]);

  return (
    <AppBar position="static" sx={{ zIndex: 1300 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
        <Box
          component="a"
          href="/"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            textDecoration: 'none',
            color: 'inherit',
            cursor: 'pointer',
            '&:hover': {
              opacity: 0.8,
            },
          }}
        >
          <TravelExploreIcon sx={{ fontSize: 32, display: { xs: 'none', sm: 'block' } }} />
          <Typography variant="h5" sx={{ display: { xs: 'none', sm: 'block' } }}>
            Travel Advisor
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1} sx={{ flexShrink: 0, position: 'relative', zIndex: 1400 }}>
          <Typography variant="h6" sx={{ display: { xs: 'none', md: 'block' }, whiteSpace: 'nowrap' }}>
            Explore new places
          </Typography>
          <Box
            ref={autocompleteRef}
            sx={{
              position: 'relative',
              borderRadius: 1,
              backgroundColor: (theme) => alpha(theme.palette.common.white, 0.15),
              border: '1px solid',
              borderColor: (theme) => alpha(theme.palette.common.white, 0.3),
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                backgroundColor: (theme) => alpha(theme.palette.common.white, 0.25),
                borderColor: (theme) => alpha(theme.palette.common.white, 0.5),
              },
              '&:focus-within': {
                backgroundColor: (theme) => alpha(theme.palette.common.white, 0.2),
                borderColor: (theme) => alpha(theme.palette.common.white, 0.7),
                boxShadow: (theme) => `0 0 0 2px ${alpha(theme.palette.common.white, 0.25)}`,
              },
              minWidth: { xs: '180px', sm: '220px', md: '280px' },
              maxWidth: '350px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              overflow: 'visible',
              '& gmp-place-autocomplete': {
                width: '100%',
                height: '100%',
                display: 'block !important',
                position: 'relative',
                zIndex: 1500,
                backgroundColor: 'transparent !important',
                border: 'none !important',
                '& > *': {
                  backgroundColor: 'transparent !important',
                  border: 'none !important',
                  zIndex: 1500,
                },
              },
              '& gmp-place-autocomplete input': {
                backgroundColor: 'transparent !important',
                border: 'none !important',
                borderColor: 'transparent !important',
                color: 'white !important',
                padding: '8px 40px 8px 40px !important',
                outline: 'none !important',
                width: '100% !important',
                fontSize: '0.875rem !important',
                fontWeight: '400 !important',
                height: '40px !important',
                boxSizing: 'border-box !important',
                boxShadow: 'none !important',
                lineHeight: '1.4375em !important',
                cursor: 'text !important',
                pointerEvents: 'auto !important',
                fontFamily: 'Roboto, Helvetica, Arial, sans-serif !important',
                letterSpacing: '0.00938em !important',
                WebkitTextFillColor: 'white !important',
                '&::placeholder': {
                  color: (theme) => alpha(theme.palette.common.white, 0.7) + ' !important',
                  opacity: 1,
                  WebkitTextFillColor: (theme) => alpha(theme.palette.common.white, 0.7) + ' !important',
                },
                '&:focus': {
                  outline: 'none !important',
                  boxShadow: 'none !important',
                  backgroundColor: 'transparent !important',
                  border: 'none !important',
                  borderColor: 'transparent !important',
                },
                '&:-webkit-autofill': {
                  WebkitBoxShadow: '0 0 0 1000px transparent inset !important',
                  WebkitTextFillColor: 'white !important',
                  transition: 'background-color 5000s ease-in-out 0s',
                  border: 'none !important',
                },
              },
              '& gmp-place-autocomplete > div': {
                backgroundColor: 'transparent !important',
                zIndex: '1500 !important',
              },
              '& gmp-place-autocomplete button, & gmp-place-autocomplete button[aria-label], & button': {
                backgroundColor: 'transparent !important',
                color: (theme) => alpha(theme.palette.common.white, 0.7) + ' !important',
                fill: (theme) => alpha(theme.palette.common.white, 0.7) + ' !important',
                border: 'none !important',
                borderRadius: '50% !important',
                cursor: 'pointer !important',
                transition: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1) !important',
                boxShadow: 'none !important',
                padding: '4px !important',
                margin: '0 4px !important',
                '&:hover': {
                  backgroundColor: (theme) => alpha(theme.palette.common.white, 0.08) + ' !important',
                  color: 'white !important',
                  fill: 'white !important',
                  boxShadow: 'none !important',
                },
                '&:active': {
                  backgroundColor: (theme) => alpha(theme.palette.common.white, 0.12) + ' !important',
                  boxShadow: 'none !important',
                },
                '&:focus': {
                  backgroundColor: (theme) => alpha(theme.palette.common.white, 0.12) + ' !important',
                  boxShadow: 'none !important',
                  outline: 'none !important',
                },
                '& svg': {
                  fill: 'currentColor !important',
                  stroke: 'none !important',
                  color: 'inherit !important',
                  width: '20px !important',
                  height: '20px !important',
                },
              },
              '& .pac-container': {
                backgroundColor: '#fff',
                borderRadius: '4px',
                marginTop: '8px',
                boxShadow: (theme) => theme.shadows[8],
                border: 'none',
                zIndex: '1500 !important',
                fontFamily: 'Roboto, Helvetica, Arial, sans-serif !important',
              },
              '& .pac-item': {
                padding: '8px 16px !important',
                fontSize: '0.875rem !important',
                lineHeight: '1.43 !important',
                cursor: 'pointer !important',
                fontFamily: 'Roboto, Helvetica, Arial, sans-serif !important',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04) !important',
                },
              },
              '& .pac-item-selected, & .pac-item:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04) !important',
              },
            }}
          >
            <Box
              sx={{
                padding: '0 8px',
                height: '40px',
                position: 'absolute',
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1501,
                top: 0,
                left: 0,
                color: (theme) => alpha(theme.palette.common.white, 0.7),
              }}
            >
              <SearchIcon sx={{ fontSize: 20 }} />
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;