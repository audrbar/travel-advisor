import React, { useState, useEffect, createRef } from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select, Box } from '@mui/material';

import PlaceDetails from '../PlaceDetails/PlaceDetails';

const List = ({ places, type, setType, rating, setRating, childClicked, isLoading }) => {
  const [elRefs, setElRefs] = useState([]);

  useEffect(() => {
    setElRefs((refs) => Array(places.length).fill().map((_, i) => refs[i] || createRef()));
  }, [places]);

  return (
    <Box sx={{ padding: '25px' }}>
      <Typography variant="h5">Food, Dining & Attractions around you</Typography>
      {isLoading ? (
        <Box sx={{ height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress size="5rem" />
        </Box>
      ) : (
        <>
          <FormControl sx={{ margin: 1, minWidth: 120, marginBottom: '30px' }} size="small">
            <InputLabel id="type-label">Type</InputLabel>
            <Select labelId="type-label" id="type" value={type} label="Type" onChange={(e) => setType(e.target.value)}>
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ margin: 1, minWidth: 120, marginBottom: '30px' }} size="small">
            <InputLabel id="rating-label">Rating</InputLabel>
            <Select labelId="rating-label" id="rating" value={rating} label="Rating" onChange={(e) => setRating(e.target.value)}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="3">Above 3.0</MenuItem>
              <MenuItem value="4">Above 4.0</MenuItem>
              <MenuItem value="4.5">Above 4.5</MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={3} sx={{ height: '75vh', overflow: 'auto' }}>
            {places?.map((place, i) => (
              <Grid ref={elRefs[i]} key={i} item xs={12}>
                <PlaceDetails selected={Number(childClicked) === i} refProp={elRefs[i]} place={place} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default List;