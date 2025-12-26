# Travel Advisor

A modern React application that helps users discover restaurants, hotels, and attractions around the world. Built with React, Material-UI, and powered by Google Maps API and RapidAPI Travel Advisor.

![Travel Advisor](https://img.shields.io/badge/React-18.3.1-blue) ![Material-UI](https://img.shields.io/badge/MUI-5.16.7-blue) ![License](https://img.shields.io/badge/license-MIT-green)

## 🌟 Features

- **Interactive Map Interface** - Explore locations with Google Maps integration
- **Real-time Location Detection** - Automatically detects and centers on user's current location
- **Smart Search** - Advanced location search with autocomplete functionality
- **Place Discovery** - Find restaurants, hotels, and attractions in any area
- **Filtering & Sorting** - Filter places by rating (3.0+, 4.0+, 4.5+)
- **Detailed Information** - View ratings, reviews, photos, and contact details for each place
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Weather Integration** - Real-time weather information for selected locations
- **Material-UI Styled** - Modern, clean interface with consistent Material Design

## 🚀 Demo

The application displays:
- An interactive Google Map showing your current location or searched location
- A list of nearby places based on selected category (restaurants, hotels, attractions)
- Detailed cards with ratings, reviews, pricing, and direct links to external services
- Real-time weather data for the current map location

## 🛠️ Technologies Used

### Frontend
- **React 18.3.1** - Modern React with hooks
- **Material-UI (MUI) 5.16.7** - Component library for UI design
- **Google Maps JavaScript API** - Interactive maps and place autocomplete
- **Axios** - HTTP client for API requests

### APIs
- **Google Maps JavaScript API** - Maps, Places, and Geocoding
- **RapidAPI Travel Advisor** - Place data (restaurants, hotels, attractions)
- **OpenWeatherMap API** - Weather information

### Styling
- **Material-UI (MUI)** - Component styling with sx prop
- **Emotion** - CSS-in-JS styling solution
- **Responsive Design** - Mobile-first approach

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14.0.0 or higher)
- **npm** (v6.0.0 or higher) or **yarn**
- **Google Maps API Key** with the following APIs enabled:
  - Maps JavaScript API
  - Places API (New)
  - Geocoding API
- **RapidAPI Account** with Travel Advisor API subscription

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/travel-advisor.git
   cd travel-advisor
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```

4. **Add your API keys to `.env`**
   ```env
   REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
   REACT_APP_RAPIDAPI_KEY=your_rapidapi_key_here
   ```

   **Important:** Never commit the `.env` file to version control. It's already included in `.gitignore`.

## 🎯 Getting API Keys

### Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - Maps JavaScript API
   - Places API (New)
   - Geocoding API
4. Go to "Credentials" and create an API key
5. (Optional) Restrict your API key to specific domains for security

### RapidAPI Travel Advisor Key

1. Sign up at [RapidAPI](https://rapidapi.com/)
2. Subscribe to [Travel Advisor API](https://rapidapi.com/apidojo/api/travel-advisor)
3. Copy your API key from the dashboard

## 🚀 Running the Application

### Development Mode

```bash
npm start
```

Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

The page will reload when you make changes. You may also see lint errors in the console.

### Production Build

```bash
npm run build
```

Builds the app for production to the `build` folder. The build is minified and optimized for best performance.

### Run Tests

```bash
npm test
```

Launches the test runner in interactive watch mode.

## 📁 Project Structure

```
travel-advisor/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── api/
│   │   └── travelAdvisorAPI.js    # API calls for places and weather
│   ├── components/
│   │   ├── Header/
│   │   │   ├── Header.jsx          # Navigation with search
│   │   │   └── styles.js
│   │   ├── List/
│   │   │   ├── List.jsx            # List of places with filters
│   │   │   └── styles.js
│   │   ├── Map/
│   │   │   ├── Map.jsx             # Interactive Google Map
│   │   │   └── styles.js
│   │   └── PlaceDetails/
│   │       ├── PlaceDetails.jsx    # Individual place card
│   │       └── styles.js
│   ├── App.js                       # Main application component
│   ├── index.js                     # Application entry point
│   └── mapStyles.js                 # Custom map styling
├── .env                             # Environment variables (not in repo)
├── .env.example                     # Example environment file
├── .gitignore
├── package.json
└── README.md
```

## 🎨 Features in Detail

### Location Search
- Advanced autocomplete powered by Google Places API
- MUI-styled search input with proper theming
- Dropdown suggestions with Material Design styling
- Responsive design that works on all screen sizes

### Interactive Map
- Google Maps integration with custom styling
- Click on markers to view place details
- Auto-centering on user location
- Smooth animations and transitions

### Place Filtering
- Filter by type: Restaurants, Hotels, Attractions
- Filter by rating: All, 3.0+, 4.0+, 4.5+
- Real-time updates as you pan the map

### Place Cards
- Ratings with visual indicators
- Review counts and pricing information
- Photos from Google Places
- Direct links to TripAdvisor and websites
- Phone numbers and addresses

## 🔒 Security Best Practices

- API keys are stored in environment variables
- `.env` file is excluded from version control
- Consider implementing API key restrictions in Google Cloud Console
- Use HTTPS in production
- Implement rate limiting for API calls

## 🐛 Troubleshooting

### Map not loading
- Verify your Google Maps API key is correct
- Ensure Maps JavaScript API is enabled in Google Cloud Console
- Check browser console for specific error messages

### Places not appearing
- Verify your RapidAPI key is valid
- Check if you have an active subscription to Travel Advisor API
- Ensure you haven't exceeded API rate limits

### Location detection not working
- Allow location permissions in your browser
- Check if your browser supports geolocation API
- Falls back to London if location detection fails

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👏 Acknowledgments

- [Google Maps Platform](https://developers.google.com/maps) for mapping services
- [RapidAPI](https://rapidapi.com/) for Travel Advisor API
- [Material-UI](https://mui.com/) for the component library
- [Create React App](https://create-react-app.dev/) for project scaffolding

## 📧 Contact

For questions or feedback, please reach out or open an issue on GitHub.

---

**Happy Traveling! 🌍✈️**
