import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Select,
  VStack,
  Heading,
  Text,
  Link,
} from "@chakra-ui/react";
import { state_arr, s_a } from "../components/stateDistrictData";
import Navbar from "./home/Navbar";

const CropPredictionForm = () => {
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [season, setSeason] = useState("");
  const [districts, setDistricts] = useState([]);
  const [result, setResult] = useState("");

  const handleStateChange = (event) => {
    const selectedState = event.target.value;
    const selectedIndex = state_arr.indexOf(selectedState);
    setState(selectedState);
    setDistrict(""); // Reset district selection

    if (selectedIndex >= 0) {
      setDistricts(s_a[selectedIndex] ? s_a[selectedIndex].split(" | ") : []);
    } else {
      setDistricts([]);
    }
  };

  const handleDistrictChange = (event) => {
    setDistrict(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://genpact-farming-1.onrender.com/api/predict",
        {
          state,
          district,
          season,
        }
      );
      setResult(response.data.result);
    } catch (error) {
      console.error("Error fetching prediction:", error);
      setResult("Error fetching prediction");
    }
  };

  const renderResults = () => {
    if (result) {
      return result.split(",").map((item, index) => (
        <Box key={index} display="flex" alignItems="center" mb={2}>
          <Text flex={1}>{item.trim()}</Text>
          <Link to="/aiChatbot" color="blue.500" ml={4}>
            Ask Chatbot
          </Link>
        </Box>
      ));
    }
    return null;
  };

  return (
    <div>
      <Navbar />
      <Box
        maxW="md"
        margin="20px"
        mx="auto"
        p={6}
        borderWidth={1}
        borderRadius="lg"
        overflow="hidden"
        bg="whiteAlpha.800"
      >
        <Heading as="h2" size="lg" mb={6} textAlign="center">
          Crop Prediction
        </Heading>
        <Box
          as="form"
          onSubmit={handleSubmit}
          maxH="80vh"
          overflowY="auto"
          p={4}
          borderWidth={1}
          borderRadius="lg"
        >
          <VStack spacing={4} align="stretch">
            <FormControl isRequired>
              <FormLabel>State</FormLabel>
              <Select value={state} onChange={handleStateChange}>
                <option value="">Select State</option>
                {state_arr.map((state, index) => (
                  <option key={index} value={state}>
                    {state}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>District</FormLabel>
              <Select
                value={district}
                onChange={handleDistrictChange}
                disabled={!districts.length}
              >
                <option value="">Select District</option>
                {districts.map((district, index) => (
                  <option key={index} value={district}>
                    {district}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Season</FormLabel>
              <Select
                value={season}
                onChange={(e) => setSeason(e.target.value)}
              >
                <option value="">Select Season</option>
                <option value="Kharif">Kharif</option>
                <option value="Whole Year">Whole Year</option>
                <option value="Autumn">Autumn</option>
                <option value="Rabi">Rabi</option>
                <option value="Summer">Summer</option>
                <option value="Winter">Winter</option>
              </Select>
            </FormControl>
            <Button type="submit" colorScheme="green" width="full">
              Predict
            </Button>
          </VStack>
        </Box>

        <Box mt={6}>
          <Heading as="h3" size="md" mb={4}>
            Prediction Results:
          </Heading>
          {renderResults()}
        </Box>
      </Box>
    </div>
  );
};

export default CropPredictionForm;
