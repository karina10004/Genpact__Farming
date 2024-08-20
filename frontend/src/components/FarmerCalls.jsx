import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Flex,
  Heading,
  List,
  ListItem,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const FarmerCalls = () => {
  const [calls, setCalls] = useState([]);
  const [loggedUser, setLoggedUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();

  const user = JSON.parse(localStorage.getItem("userInfo"));

  const fetchCalls = async () => {
    try {
      const response = await axios.get(
        `https://genpact-farming-1.onrender.com/api/call/farmer/${user._id}`
      );
      setCalls(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchCalls();
  }, []);

  const handleCall = (id) => {
    navigate(`/join-call/${id}`);
  };

  if (loading) return <Spinner size="xl" />;
  if (error) return <Text color="red.500">Error: {error}</Text>;

  return (
    <Box p={8}>
      <Heading mb={6}>Scheduled Calls for Farmer</Heading>
      <List spacing={4}>
        {calls.map((call) => (
          <ListItem
            key={call._id}
            p={4}
            border="1px solid"
            borderColor="gray.200"
            borderRadius="md"
            boxShadow="md"
          >
            <Flex justify="space-between" align="center">
              <Box>
                <Text fontWeight="bold">Expert: {call.expert_id.name}</Text>
                <Text>
                  Call Date: {new Date(call.call_date).toLocaleString()}
                </Text>
                <Text>Status: {call.status}</Text>
              </Box>
              <Button colorScheme="teal" onClick={() => handleCall(call._id)}>
                Join Call
              </Button>
            </Flex>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default FarmerCalls;
