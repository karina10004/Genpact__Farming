import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  Heading,
  Text,
} from "@chakra-ui/react";
import Navbar from "./home/Navbar";

const FertilizerRecommendation = () => {
  // Initializing state variables
  const [n, setN] = useState("");
  const [p, setP] = useState("");
  const [k, setK] = useState("");
  const [t, setT] = useState("");
  const [h, setH] = useState("");
  const [soilMoisture, setSoilMoisture] = useState("");
  const [soil, setSoil] = useState("");
  const [crop, setCrop] = useState("");
  const [result, setResult] = useState(""); // Ensure this is defined properly

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://genpact-farming.onrender.com/api/fertilizer-recommendation",
        {
          n,
          p,
          k,
          t,
          h,
          soilMoisture,
          soil,
          crop,
        }
      );
      setResult(response.data.result); // Updating the result state
    } catch (error) {
      console.error("Error fetching recommendation:", error);
      setResult("Error fetching recommendation");
    }
  };

  return (
    <div>
      <Navbar/>
    <Box
      maxW="md"
      margin='20px'
      mx="auto"
      p={4}
      borderWidth={1}
      borderRadius="lg"
      overflow="hidden"
      bg="whiteAlpha.800"
    >
      <Heading as="h2" size="lg" mb={4}>
        Fertilizer Recommendation
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
            <FormLabel>Nitrogen (N)</FormLabel>
            <Input
              type="number"
              value={n}
              onChange={(e) => setN(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Phosphorus (P)</FormLabel>
            <Input
              type="number"
              value={p}
              onChange={(e) => setP(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Potassium (K)</FormLabel>
            <Input
              type="number"
              value={k}
              onChange={(e) => setK(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Temperature (°C)</FormLabel>
            <Input
              type="number"
              value={t}
              onChange={(e) => setT(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Humidity (%)</FormLabel>
            <Input
              type="number"
              value={h}
              onChange={(e) => setH(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Soil Moisture (%)</FormLabel>
            <Input
              type="number"
              value={soilMoisture}
              onChange={(e) => setSoilMoisture(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Soil Type</FormLabel>
            <Select value={soil} onChange={(e) => setSoil(e.target.value)}>
              <option value="">Select Soil Type</option>
              <option value="Sandy">Sandy</option>
              <option value="Loamy">Loamy</option>
              <option value="Black">Black</option>
              <option value="Red">Red</option>
              <option value="Clayey">Clayey</option>
            </Select>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Crop</FormLabel>
            <Select value={crop} onChange={(e) => setCrop(e.target.value)}>
              <option value="">Select Crop</option>
              <option value="Maize">Maize</option>
              <option value="Sugarcane">Sugarcane</option>
              <option value="Cotton">Cotton</option>
              <option value="Tobacco">Tobacco</option>
              <option value="Paddy">Paddy</option>
              <option value="Barley">Barley</option>
              <option value="Wheat">Wheat</option>
              <option value="Millets">Millets</option>
              <option value="Oil seeds">Oil seeds</option>
              <option value="Pulses">Pulses</option>
              <option value="Ground Nuts">Ground Nuts</option>
            </Select>
          </FormControl>
          <Button type="submit" colorScheme="green" width="full">
            Recommend
          </Button>
        </VStack>
      </Box>
      {/* Displaying the result */}
      {result && (
        <Box mt={4} p={4} borderWidth={1} borderRadius="lg" bg="green.50">
          <Text fontSize="lg">Recommended Fertilizer: {result}</Text>
        </Box>
      )}
      {/* Displaying error if there's an issue */}
      {result === "Error fetching recommendation" && (
        <Box mt={4} p={4} borderWidth={1} borderRadius="lg" bg="red.50">
          <Text fontSize="lg" color="red.500">
            There was an error processing your request. Please try again.
          </Text>
        </Box>
      )}
    </Box>
    </div>
  );
};

export default FertilizerRecommendation;
