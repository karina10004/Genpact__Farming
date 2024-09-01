import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  Container,
  Grid,
  GridItem,
  Heading,
  Text,
  Tooltip,
  Spinner,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import Navbar from "./home/Navbar";

const FertilizerRecommendation = () => {
  const [n, setN] = useState("");
  const [p, setP] = useState("");
  const [k, setK] = useState("");
  const [t, setT] = useState("");
  const [h, setH] = useState("");
  const [soilMoisture, setSoilMoisture] = useState("");
  const [soil, setSoil] = useState("");
  const [crop, setCrop] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://genpact-farming-1.onrender.com/api/fertilizer-recommendation",
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
      setResult(response.data.result);
    } catch (error) {
      console.error("Error fetching recommendation:", error);
      setResult("Error fetching recommendation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <Container maxW="container.xl" p={4}>
        <Grid templateColumns={{ base: "1fr", md: "2fr 1.09fr" }} gap={6}>
          <GridItem>
            <Box
              maxW="15md"
              margin="20px auto"
              p={4}
              borderWidth={1}
              borderRadius="lg"
              overflow="hidden"
              bg=""
            >
              <Heading as="h2" size="lg" mb={4}
              > 
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
                bg="white"
              >
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  <FormControl isRequired>
                    <FormLabel>Nitrogen (N)</FormLabel>
                    <Tooltip label="Enter the amount of Nitrogen in the soil" aria-label="Nitrogen Tooltip">
                      <Input
                        type="number"
                        value={n}
                        onChange={(e) => setN(e.target.value)}
                        bg="white"
                        borderColor="gray.300"
                        placeholder="e.g., 50"
                      />
                    </Tooltip>
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Phosphorus (P)</FormLabel>
                    <Tooltip label="Enter the amount of Phosphorus in the soil" aria-label="Phosphorus Tooltip">
                      <Input
                        type="number"
                        value={p}
                        onChange={(e) => setP(e.target.value)}
                        bg="white"
                        borderColor="gray.300"
                        placeholder="e.g., 30"
                      />
                    </Tooltip>
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Potassium (K)</FormLabel>
                    <Tooltip label="Enter the amount of Potassium in the soil" aria-label="Potassium Tooltip">
                      <Input
                        type="number"
                        value={k}
                        onChange={(e) => setK(e.target.value)}
                        bg="white"
                        borderColor="gray.300"
                        placeholder="e.g., 40"
                      />
                    </Tooltip>
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Temperature (°C)</FormLabel>
                    <Tooltip label="Enter the average temperature in degrees Celsius" aria-label="Temperature Tooltip">
                      <Input
                        type="number"
                        value={t}
                        onChange={(e) => setT(e.target.value)}
                        bg="white"
                        borderColor="gray.300"
                        placeholder="e.g., 25"
                      />
                    </Tooltip>
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Humidity (%)</FormLabel>
                    <Tooltip label="Enter the average humidity percentage" aria-label="Humidity Tooltip">
                      <Input
                        type="number"
                        value={h}
                        onChange={(e) => setH(e.target.value)}
                        bg="white"
                        borderColor="gray.300"
                        placeholder="e.g., 60"
                      />
                    </Tooltip>
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Soil Moisture (%)</FormLabel>
                    <Tooltip label="Enter the moisture level in the soil" aria-label="Soil Moisture Tooltip">
                      <Input
                        type="number"
                        value={soilMoisture}
                        onChange={(e) => setSoilMoisture(e.target.value)}
                        bg="white"
                        borderColor="gray.300"
                        placeholder="e.g., 40"
                      />
                    </Tooltip>
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
                </SimpleGrid>
                <Button
                  type="submit"
                  colorScheme="green"
                  width="full"
                  mt={4}
                  boxShadow="md"
                  _hover={{ bg: "green.600" }}
                >
                  {loading ? <Spinner size="sm" /> : "Recommend"}
                </Button>
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
          </GridItem>

          {/* Instructional Section */}
          <GridItem>
            <Box
              maxW="40md"
              p={4}
              borderWidth={1}
              borderRadius="lg"
              bg="blue.50"
              height="full"
              overflowY="auto"
            >
              <Heading as="h3" size="md" mb={2}>
                How to Use This Form
              </Heading>
              <Text mb={4}>
                Please provide the following details to receive a personalized
                fertilizer recommendation for your crop:
              </Text>
              <Text mb={2}>
                <strong>Nitrogen (N)</strong>: The amount of Nitrogen in the soil.
                <br />
                <strong>Phosphorus (P)</strong>: The amount of Phosphorus in the
                soil.
                <br />
                <strong>Potassium (K)</strong>: The amount of Potassium in the
                soil.
                <br />
                <strong>Temperature (°C)</strong>: Average temperature in degrees Celsius.
                <br />
                <strong>Humidity (%)</strong>: Average humidity percentage.
                <br />
                <strong>Soil Moisture (%)</strong>: Moisture level in the soil.
                <br />
                <strong>Soil Type</strong>: Type of soil (e.g., Sandy, Loamy).
                <br />
                <strong>Crop</strong>: Type of crop you are growing.
              </Text>
              <Text mb={4}>
                <strong>Example Usage:</strong>
                <br />
                If you are growing Maize in Loamy soil with a temperature of 25°C,
                60% humidity, and 40% soil moisture, enter these values accordingly.
                This will help us provide the most suitable fertilizer recommendation.
              </Text>
              <Text>
                <strong>Risk of Incorrect Input:</strong>
                <br />
                Providing inaccurate data may result in suboptimal fertilizer
                recommendations, which could affect the health and yield of your
                crop. Please ensure all values are as accurate as possible.
              </Text>
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </div>
  );
};

export default FertilizerRecommendation;
