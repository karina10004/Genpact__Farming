import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Text, Spinner } from "@chakra-ui/react";

function Weather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(latitude, longitude);
        },
        (error) => {
          setError("Unable to retrieve your location");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  }, []);

  const fetchWeather = async (lat, lon) => {
    try {
      const API_KEY = "e899398fa51330106ff26c33d31640d7"; // Replace with your API key
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      setWeather(response.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch weather data");
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;
  if (error) return <Text color="red.500">{error}</Text>;

  return (
    <Box>
      {weather && (
        <Box>
          <Text fontSize="xl">
            Current Weather: {weather.weather[0].description}
          </Text>
          <Text fontSize="lg">Temperature: {weather.main.temp}°C</Text>
        </Box>
      )}
    </Box>
  );
}

export default Weather;
