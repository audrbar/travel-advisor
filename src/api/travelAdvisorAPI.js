// Use Google Maps JavaScript API Place.searchNearby() - New API
export const getPlacesData = async (type, sw, ne, mapsApi) => {
  try {
    if (!mapsApi) {
      console.error('Google Maps API not available');
      throw new Error('Google Maps API not initialized');
    }

    // Import required libraries
    const { Place, SearchNearbyRankPreference } = mapsApi.places;
    const { LatLng } = mapsApi;

    // Calculate center point and radius from bounds
    const centerLat = (sw.lat + ne.lat) / 2;
    const centerLng = (sw.lng + ne.lng) / 2;
    const center = new LatLng(centerLat, centerLng);

    // Calculate radius from bounds using simple distance formula
    // Approximate: 1 degree latitude ≈ 111km
    const latDiff = ne.lat - sw.lat;
    const lngDiff = ne.lng - sw.lng;
    // Calculate diagonal distance and divide by 2
    const diagonalDegrees = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);
    const radius = Math.min(Math.round(diagonalDegrees * 111000 / 2), 50000); // Max 50km

    // Map types to Google Places API types
    const typeMap = {
      'restaurants': 'restaurant',
      'hotels': 'lodging',
      'attractions': 'tourist_attraction'
    };

    const placeType = typeMap[type] || 'restaurant';

    // console.log('Fetching places with new API:', {
    //   center: { lat: centerLat, lng: centerLng },
    //   radius: Math.round(radius),
    //   type: placeType
    // });

    // Create search request
    const request = {
      fields: [
        'displayName',
        'location',
        'formattedAddress',
        'rating',
        'userRatingCount',
        'priceLevel',
        'photos',
        'types',
        'websiteURI',
        'nationalPhoneNumber',
        'regularOpeningHours',
        'id'
      ],
      locationRestriction: {
        center: center,
        radius: Math.round(radius)
      },
      includedPrimaryTypes: [placeType],
      maxResultCount: 20,
      rankPreference: SearchNearbyRankPreference.POPULARITY,
      language: 'en'
    };

    // Call searchNearby
    const { places } = await Place.searchNearby(request);

    // console.log('Google Places API results:', places?.length || 0, 'places');
    // console.log('Google Place results:', places[0]);

    if (!places || places.length === 0) {
      return [];
    }

    // Transform results to match expected format
    const transformedData = places.map(place => ({
      name: place.displayName || 'Unknown',
      latitude: place.location?.lat(),
      longitude: place.location?.lng(),
      rating: place.rating || 0,
      num_reviews: place.userRatingCount || 0,
      price_level: place.priceLevel,
      address: place.formattedAddress,
      phone: place.nationalPhoneNumber,
      website: place.websiteURI,
      photo: place.photos?.[0] ? {
        images: {
          large: {
            url: place.photos[0].getURI({ maxWidth: 400, maxHeight: 400 })
          }
        }
      } : null,
      cuisine: place.types,
      open_now_text: place.regularOpeningHours?.openNow ? 'Open Now' : 'Closed',
      place_id: place.id
    }));

    // console.log('Transformed data:', transformedData.length, 'places');

    return transformedData;
  } catch (error) {
    console.error('Error fetching places:', error);
    throw error;
  }
};

export const getWeatherData = async (lat, lng) => {
  try {
    if (!lat || !lng) {
      return null;
    }

    const url = `https://weather.googleapis.com/v1/currentConditions:lookup?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&location.latitude=${lat}&location.longitude=${lng}`;

    const response = await fetch(url);

    if (!response.ok) {
      console.error('Weather API error:', response.status);
      return null;
    }

    const data = await response.json();

    // console.log('Weather API response:', data);

    // Transform to match expected format (simple structure for display)
    return {
      temperature: data.temperature,
      condition: data.weatherCondition?.description?.text,
      icon: data.weatherCondition?.iconBaseUri,
      feelsLike: data.feelsLikeTemperature,
      humidity: data.relativeHumidity,
      wind: data.wind,
      cloudCover: data.cloudCover
    };
  } catch (error) {
    console.error('Error fetching weather:', error);
    return null;
  }
};