import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack, Box, Heading, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

const ExpertSignup = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [availability, setAvailability] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async () => {
    setLoading(true);
    if (
      !name ||
      !specialization ||
      !availability ||
      !contactInfo ||
      !email ||
      !password ||
      !confirmpassword
    ) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Passwords do not match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await axios.post(
        "https://genpact-farming.onrender.com/api/expert/register",
        {
          name,
          specialization,
          availability,
          contact_info: contactInfo,
          email,
          password,
        },
        config
      );

      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("expertInfo", JSON.stringify(response.data));
      setLoading(false);
      navigate("/expertLogin");
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: error.response?.data?.message || error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <Box
      bg="gray.50"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflowY="auto" // Enable vertical scrolling
      maxH="100vh" // Limit the height to the viewport height
      p={4} // Add padding to ensure space around the content
    >
      <Box
        bg="white"
        p={8}
        rounded="lg"
        boxShadow="lg"
        maxW="md"
        w="full"
        overflowY="auto" // Enable scrolling within the form container
        maxH="calc(100vh - 8rem)" // Adjust the height based on the viewport
      >
        <Heading as="h1" size="xl" textAlign="center" mb={6} color="green.700">
          Expert Signup
        </Heading>
        <Text mb={6} color="gray.600" textAlign="center">
          Join our platform and share your expertise with farmers.
        </Text>
        <VStack spacing="10px">
          <FormControl id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="Enter Your Name"
              onChange={(e) => setName(e.target.value)}
              focusBorderColor="green.500"
              bg="gray.100"
            />
          </FormControl>
          <FormControl id="specialization" isRequired>
            <FormLabel>Specialization</FormLabel>
            <Input
              placeholder="Enter Your Specialization"
              onChange={(e) => setSpecialization(e.target.value)}
              focusBorderColor="green.500"
              bg="gray.100"
            />
          </FormControl>
          <FormControl id="availability" isRequired>
            <FormLabel>Availability</FormLabel>
            <Input
              placeholder="Enter Your Availability (e.g., Mon-Fri 9AM-5PM)"
              onChange={(e) => setAvailability(e.target.value)}
              focusBorderColor="green.500"
              bg="gray.100"
            />
          </FormControl>
          <FormControl id="contactInfo" isRequired>
            <FormLabel>Contact Information</FormLabel>
            <Input
              placeholder="Enter Your Contact Information"
              onChange={(e) => setContactInfo(e.target.value)}
              focusBorderColor="green.500"
              bg="gray.100"
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email Address</FormLabel>
            <Input
              type="email"
              placeholder="Enter Your Email Address"
              onChange={(e) => setEmail(e.target.value)}
              focusBorderColor="green.500"
              bg="gray.100"
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup size="md">
              <Input
                type={show ? "text" : "password"}
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
                focusBorderColor="green.500"
                bg="gray.100"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl id="confirm-password" isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup size="md">
              <Input
                type={show ? "text" : "password"}
                placeholder="Confirm Password"
                onChange={(e) => setConfirmpassword(e.target.value)}
                focusBorderColor="green.500"
                bg="gray.100"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Button
            colorScheme="green"
            width="100%"
            style={{ marginTop: 15 }}
            onClick={submitHandler}
            isLoading={loading}
            variant="solid"
          >
            Sign Up
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default ExpertSignup;
