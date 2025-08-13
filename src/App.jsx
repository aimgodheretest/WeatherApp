import { useState, useEffect } from "react";
import Navbar from "../src/components/Navbar.jsx";
import MainWeatherCard from "../src/components/MainWeatherCard.jsx";
import FiveDayForecast from "../src/components/Fiveday.jsx";
import TodayHighlights from "../src/components/TodayHighlight.jsx";
import axios from "axios";

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [airQualityData, setAirQualityData] = useState(null);
  const [fiveDayForecast, setFiveDayForecast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get API key from environment variables
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  // Fetch weather by city name
  useEffect(() => {
    if (city) {
      fetchWeatherData(city);
    }
  }, [city]);

  // Fetch weather by current location on initial load
  useEffect(() => {
    fetchCurrentLocationWeather();
  }, []);

  const fetchCurrentLocationWeather = () => {
    setIsLoading(true);
    setError(null);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoords(latitude, longitude);
        },
        (err) => {
          console.error("Error getting location:", err);
          setError(
            "Could not access your location. Showing default weather for London."
          );
          fetchWeatherData("London");
          setIsLoading(false);
        }
      );
    } else {
      setError(
        "Geolocation is not supported by your browser. Showing default weather for London."
      );
      fetchWeatherData("London");
      setIsLoading(false);
    }
  };

  const fetchWeatherByCoords = (lat, lon) => {
    setIsLoading(true);

    // First get city name from coordinates
    axios
      .get(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`
      )
      .then((locationResponse) => {
        const location = locationResponse.data[0];
        const cityName =
          location.name || `${lat.toFixed(2)}, ${lon.toFixed(2)}`;
        setCity(cityName);
      })
      .catch((err) => {
        console.error("Error getting location name:", err);
        setCity(`${lat.toFixed(2)}, ${lon.toFixed(2)}`);
      });
  };

  const fetchAirQualityData = (lat, lon) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      )
      .then((response) => {
        setAirQualityData(response.data.list[0]);
      })
      .catch((error) => {
        console.error("Error fetching the air quality data:", error);
        setAirQualityData(null);
      });
  };

  const fetchWeatherData = (location) => {
    setIsLoading(true);

    // Check if location is coordinates (lat,lon format)
    const isCoords = /^-?\d+\.\d+,\s*-?\d+\.\d+$/.test(location);
    const url = isCoords
      ? `https://api.openweathermap.org/data/2.5/weather?lat=${
          location.split(",")[0]
        }&lon=${location.split(",")[1]}&units=metric&appid=${API_KEY}`
      : `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.cod === 200) {
          setWeatherData(data);
          fetchAirQualityData(data.coord.lat, data.coord.lon);
          fetchFiveDayForecast(data.coord.lat, data.coord.lon);
          setError(null);
        } else {
          setError(data.message || "Could not fetch weather data");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching the weather data:", error);
        setError("Failed to fetch weather data");
        setIsLoading(false);
      });
  };

  const fetchFiveDayForecast = (lat, lon) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      )
      .then((response) => {
        setFiveDayForecast(response.data);
      })
      .catch((error) => {
        console.error("Error fetching the 5-day forecast data:", error);
        setFiveDayForecast(null);
      });
  };

  const handleSearch = (searchedCity) => {
    setCity(searchedCity);
  };

  const handleCurrentLocation = () => {
    fetchCurrentLocationWeather();
  };

  return (
    <div className="w-full min-h-screen bg-gray-800 text-white p-4">
      <Navbar
        onSearch={handleSearch}
        onCurrentLocation={handleCurrentLocation}
      />

      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-500/20 text-red-200 p-4 rounded-lg mb-4 max-w-7xl mx-auto">
          {error}
        </div>
      )}

      {weatherData && airQualityData && (
        <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto mt-4">
          {/* Left Column */}
          <div className="flex-1 space-y-4">
            <MainWeatherCard weatherData={weatherData} />
            <div className="bg-gray-700 rounded-lg p-4">
              <h2 className="text-lg font-bold mb-3">5 Days Forecast</h2>
              {fiveDayForecast && (
                <FiveDayForecast forecastData={fiveDayForecast} />
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:w-96">
            <TodayHighlights
              weatherData={weatherData}
              airQualityData={airQualityData}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherDashboard;
