import React, { useState } from "react";
import {
  Box,
  Input,
  Button,
  VStack,
  Heading,
  Text,
  Stack,
  useToast,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";
import axios from "axios";
import Navbar from "../../components/home/Navbar";

const WeatherForecast = () => {
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [days, setDays] = useState(7); // Default to 7 days
  const toast = useToast();

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      const apiKey = "cb26ceb80b5b403ebf184810240908";
      const response = await axios.get(
        `http://api.weatherapi.com/v1/forecast.json`,
        {
          params: {
            key: apiKey,
            q: city,
            days: days,
          },
        }
      );
      setForecast(response.data);
    } catch (err) {
      setError("Could not fetch weather data. Please try again.");
      toast({
        title: "Error",
        description: "Could not fetch weather data. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar/>
    <Box
    margin='30px'
      p={6}
      borderWidth="1px"
      borderRadius="lg"
      maxW="70%"
      mx="auto"
      bg={"white"}
      boxShadow="md"
    >
      <Heading mb={6} size="lg" textAlign="center">
        Weather Forecast
      </Heading>
      <VStack spacing={4} align="stretch">
        <Input
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          size="lg"
        />
        <Stack direction="row" spacing={4} justify="center">
          <Button
            colorScheme="green"
            onClick={() => setDays(7)}
            variant={days === 7 ? "solid" : "outline"}
          >
            7 Days
          </Button>
          <Button
            colorScheme="green"
            onClick={() => setDays(30)}
            variant={days === 30 ? "solid" : "outline"}
          >
            30 Days
          </Button>
        </Stack>
        <Button
          colorScheme="green"
          onClick={fetchWeather}
          isLoading={loading}
          size="lg"
        >
          Get Forecast
        </Button>
        {error && (
          <Text color="red.500" textAlign="center">
            {error}
          </Text>
        )}
        {forecast && (
          <Box mt={6}>
            <Heading size="md" mb={4}>
              Weather in {forecast.location.name}
            </Heading>
            <Text fontSize="lg" mb={4}>
              {forecast.location.country}
            </Text>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              {forecast.forecast.forecastday.map((day) => (
                <Box
                  key={day.date}
                  p={4}
                  borderWidth="1px"
                  borderRadius="md"
                  bg={"white"}
                >
                  <Text fontSize="lg" fontWeight="bold">
                    {new Date(day.date).toLocaleDateString()}
                  </Text>
                  <Text>Condition: {day.day.condition.text}</Text>
                  <Text>Max Temp: {day.day.maxtemp_c}°C</Text>
                  <Text>Min Temp: {day.day.mintemp_c}°C</Text>
                  <Text>Humidity: {day.day.avghumidity}%</Text>
                  <Text>Wind Speed: {day.day.maxwind_kph} kph</Text>
                  <Text>Sunrise: {day.astro.sunrise}</Text>
                  <Text>Sunset: {day.astro.sunset}</Text>
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        )}
      </VStack>
    </Box>
    </div>
  );
};

export default WeatherForecast;
