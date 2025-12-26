import React from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import Rating from '@mui/material/Rating';

const PlaceDetails = ({ place, selected, refProp }) => {
  if (selected) refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <Card elevation={6}>
      <CardMedia
        style={{ height: 350 }}
        image={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
        title={place.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">{place.name}</Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center" my={2}>
          <Rating name="read-only" value={Number(place.rating)} readOnly />
          <Typography component="legend" variant="body2">
            {place.rating ? `${place.rating} (${place.num_reviews} review${place.num_reviews !== 1 ? 's' : ''})` : 'No rating'}
          </Typography>
        </Box>
        {place.price_level && (
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography component="legend">Price</Typography>
            <Typography gutterBottom variant="subtitle1">
              {'$'.repeat(place.price_level)}
            </Typography>
          </Box>
        )}
        {place.open_now_text && (
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography component="legend">Status</Typography>
            <Typography
              gutterBottom
              variant="subtitle1"
              color={place.open_now_text === 'Open Now' ? 'success.main' : 'text.secondary'}
            >
              {place.open_now_text}
            </Typography>
          </Box>
        )}
        {place?.cuisine?.length > 0 && (
          <Box mt={2} mb={1}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>Categories</Typography>
            {place.cuisine.map((type, index) => (
              <Chip
                key={`${type}-${index}`}
                size="small"
                label={type.replace(/_/g, ' ')}
                sx={{ margin: '5px 5px 5px 0', textTransform: 'capitalize' }}
              />
            ))}
          </Box>
        )}
        {place.address && (
          <Typography gutterBottom variant="body2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px' }}>
            <LocationOnIcon />{place.address}
          </Typography>
        )}
        {place.phone && (
          <Typography variant="body2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <PhoneIcon /> {place.phone}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        {place.website && (
          <Button size="small" color="primary" onClick={() => window.open(place.website, '_blank')}>
            Website
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default PlaceDetails;