import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  SimpleGrid,
  Avatar,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ExpertDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const bgColor = useColorModeValue("gray.50", "gray.700");

  const expert = JSON.parse(localStorage.getItem("expertInfo")).expert;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch pending consultation requests
        const requestsResponse = await axios.get(
          `https://genpact-farming.onrender.com/api/call/pending/${expert._id}`
        );
        setRequests(requestsResponse.data);

        // Fetch scheduled calls for the expert
        const callsResponse = await axios.get(
          `https://genpact-farming.onrender.com/api/call/expert/${expert._id}`
        );
        setCalls(callsResponse.data);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [expert._id]);

  const handleUpdateStatus = async (id, status) => {
    try {
      await axios.patch(
        `https://genpact-farming.onrender.com/api/call/${id}/status`,
        {
          status,
        }
      );
      setRequests(
        requests.map((req) => (req._id === id ? { ...req, status } : req))
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleCall = (id) => {
    navigate(`/join-call/${id}`);
  };

  if (loading) {
    return (
      <Box p={6} maxW="1200px" mx="auto">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={6} maxW="1200px" mx="auto">
        <Text color="red.500">Error: {error}</Text>
      </Box>
    );
  }

  return (
    <Box p={6} maxW="1200px" mx="auto">
      <Heading as="h1" size="xl" mb={6} color="green.700">
        Expert Dashboard
      </Heading>

      <VStack align="stretch" spacing={6}>
        {/* Profile Section */}
        <Box
          p={6}
          bg={bgColor}
          borderWidth="1px"
          borderRadius="lg"
          boxShadow="md"
        >
          <HStack spacing={4}>
            <Avatar size="xl" name="Expert Name" src="/path/to/avatar.jpg" />
            <VStack align="start" spacing={1}>
              <Heading as="h2" size="lg" color="green.700">
                {expert.name}
              </Heading>
              <Text fontSize="md" color="gray.600">
                {expert.specialization}
              </Text>
              {/* <HStack>
                <Button leftIcon={<FaRegEdit />} colorScheme="blue">
                  Edit Profile
                </Button>
                <Button leftIcon={<FaTrashAlt />} colorScheme="red">
                  Delete Account
                </Button>
              </HStack> */}
            </VStack>
          </HStack>
        </Box>

        {/* Expert Statistics */}
        <Box
          p={6}
          bg={bgColor}
          borderWidth="1px"
          borderRadius="lg"
          boxShadow="md"
        >
          <Heading as="h3" size="md" mb={4} color="green.700">
            Statistics
          </Heading>
          <SimpleGrid columns={[1, 2, 3]} spacing={6}>
            <Box textAlign="center">
              <Heading size="lg" color="green.600">
                150+
              </Heading>
              <Text>Consultations</Text>
            </Box>
            <Box textAlign="center">
              <Heading size="lg" color="green.600">
                120+
              </Heading>
              <Text>Positive Reviews</Text>
            </Box>
            <Box textAlign="center">
              <Heading size="lg" color="green.600">
                200+
              </Heading>
              <Text>Articles Published</Text>
            </Box>
          </SimpleGrid>
        </Box>

        {/* Consultation Requests */}
        <Box
          p={6}
          bg={bgColor}
          borderWidth="1px"
          borderRadius="lg"
          boxShadow="md"
        >
          <Heading as="h3" size="md" mb={4} color="green.700">
            Consultation Requests
          </Heading>
          {requests.length === 0 ? (
            <Text>No pending requests.</Text>
          ) : (
            requests.map((request) => (
              <Box key={request._id} p={4} bg="white" borderRadius="md" mb={4}>
                <HStack justify="space-between">
                  <VStack align="start">
                    <Text fontWeight="bold">
                      Farmer: {request.farmer_id.name}
                    </Text>
                    <Text>
                      Call Date: {new Date(request.call_date).toLocaleString()}
                    </Text>
                    <Text>Status: {request.status}</Text>
                  </VStack>
                  {request.status === "Pending" && (
                    <HStack>
                      <Button
                        colorScheme="green"
                        onClick={() =>
                          handleUpdateStatus(request._id, "Approved")
                        }
                      >
                        Accept
                      </Button>
                      <Button
                        colorScheme="red"
                        onClick={() =>
                          handleUpdateStatus(request._id, "Cancelled")
                        }
                      >
                        Reject
                      </Button>
                    </HStack>
                  )}
                </HStack>
              </Box>
            ))
          )}
        </Box>

        {/* Scheduled Calls */}
        <Box
          p={6}
          bg={bgColor}
          borderWidth="1px"
          borderRadius="lg"
          boxShadow="md"
        >
          <Heading as="h3" size="md" mb={4} color="green.700">
            Scheduled Calls
          </Heading>
          {calls.length === 0 ? (
            <Text>No scheduled calls.</Text>
          ) : (
            calls.map((call) => (
              <Box key={call._id} p={4} bg="white" borderRadius="md" mb={4}>
                <HStack justify="space-between">
                  <VStack align="start">
                    <Text fontWeight="bold">Farmer: {call.farmer_id.name}</Text>
                    <Text>
                      Call Date: {new Date(call.call_date).toLocaleString()}
                    </Text>
                    <Text>Status: {call.status}</Text>
                  </VStack>
                  <Button
                    colorScheme="blue"
                    onClick={() => handleCall(call._id)}
                  >
                    Join Call
                  </Button>
                </HStack>
              </Box>
            ))
          )}
        </Box>
      </VStack>
    </Box>
  );
};

export default ExpertDashboard;
