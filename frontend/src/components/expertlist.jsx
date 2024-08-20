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
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import Navbar from "./home/Navbar";

const ExpertList = () => {
  const [experts, setExperts] = useState([]);
  const [loggedUser, setLoggedUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const response = await axios.get(
          "https://genpact-farming-1.onrender.com/api/expert/all"
        );
        setExperts(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setLoggedUser(userInfo);

    fetchExperts();
  }, []);

  const openModal = (expert) => {
    setSelectedExpert(expert);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedExpert(null);
  };

  const handleScheduleCall = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://genpact-farming-1.onrender.com/api/call/", {
        expert_id: selectedExpert._id,
        farmer_id: loggedUser._id,
        status: "Pending",
      });
      toast({
        title: "Call Scheduled",
        description: `Your call with ${selectedExpert.name} has been scheduled.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      closeModal();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to schedule the call.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (loading) return <Spinner size="xl" />;
  if (error) return <Text color="red.500">Error: {error}</Text>;

  return (
    <div>
      <Navbar />
      <Box p={8}>
        <Heading mb={6}>Experts List</Heading>
        <List spacing={4}>
          {experts.map((expert) => (
            <ListItem
              key={expert._id}
              p={4}
              border="1px solid"
              borderColor="gray.200"
              borderRadius="md"
              boxShadow="md"
            >
              <Flex justify="space-between" align="center">
                <Box>
                  <Text fontWeight="bold">{expert.name}</Text>
                  <Text>{expert.specialization}</Text>
                </Box>
                <Button colorScheme="teal" onClick={() => openModal(expert)}>
                  Schedule Call
                </Button>
              </Flex>
            </ListItem>
          ))}
        </List>

        <Modal isOpen={modalIsOpen} onClose={closeModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Schedule Call</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text mb={4}>
                Are you sure you want to schedule a call with{" "}
                <Text as="span" fontWeight="bold">
                  {selectedExpert && selectedExpert.name}
                </Text>
                ?
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleScheduleCall}>
                Schedule
              </Button>
              <Button variant="ghost" onClick={closeModal}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Button
          mt={6}
          colorScheme="blue"
          onClick={() => navigate("/farmer-calls")}
        >
          Go to scheduled calls
        </Button>
      </Box>
    </div>
  );
};

export default ExpertList;
