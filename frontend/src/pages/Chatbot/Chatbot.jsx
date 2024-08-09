import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  Flex,
  Image,
  Text,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import gptLogo from "./assets/assets/assistant-svgrepo-com.svg";
import addBtn from "./assets/assets/add-30.png";
import msgIcon from "./assets/assets/message.svg";
import home from "./assets/assets/home.svg";
import saved from "./assets/assets/bookmark.svg";
import rocket from "./assets/assets/rocket.svg";
import sendBtn from "./assets/assets/send.svg";
import userIcon from "./assets/assets/user-icon.png";
import gptImgLogo from "./assets/assets/assistant-svgrepo-com.svg";
import { sendMsgToOpenAi } from "./openai";

function Chatbot() {
  const navigate = useNavigate("/Home");
  const [input, setInput] = useState("");
  const [message, setMessage] = useState([
    {
      text: "hi",
      isBot: true,
    },
  ]);

  const handleSend = async () => {
    const text = input;
    setInput("");
    setMessage([
      ...message,
      {
        text,
        isBot: false,
      },
    ]);
    const res = await sendMsgToOpenAi(input);
    setMessage([
      ...message,
      {
        text,
        isBot: false,
      },
      {
        text: res,
        isBot: true,
      },
    ]);
  };

  return (
    <Flex height="100vh" backgroundColor="gray.100">
      {/* Sidebar */}
      <Box
        width={{ base: "60px", md: "250px" }}
        bg="gray.800"
        color="white"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        padding={4}
      >
        {/* Upper Side */}
        <Box>
          <HStack spacing={4} marginBottom={8}>
            <Image src={gptLogo} alt="logo" boxSize="30px" />
            <Text
              display={{ base: "none", md: "block" }}
              fontSize="2xl"
              fontWeight="bold"
            >
              FarmGPT
            </Text>
          </HStack>

          <Button
            leftIcon={<Image src={addBtn} alt="newChat" boxSize="20px" />}
            bg="green.500"
            // _hover={{ bg: "blue.400" }}
            width="100%"
            mb={8}
            colorScheme="green"
            display="flex"
            justifyContent={{ base: "center", md: "flex-start" }}
          >
            <Text display={{ base: "none", md: "block" }}>New Chat</Text>
          </Button>

          <VStack spacing={4} align="stretch">
            <Button
              leftIcon={<Image src={msgIcon} alt="query" boxSize="20px" />}
              bg="gray.700"
              _hover={{ bg: "gray.600" }}
              display="flex"
              justifyContent={{ base: "center", md: "flex-start" }}
            >
              <Text display={{ base: "none", md: "block" }}>
                What is Organic Farming?
              </Text>
            </Button>
            <Button
              leftIcon={<Image src={msgIcon} alt="query" boxSize="20px" />}
              bg="gray.700"
              _hover={{ bg: "gray.600" }}
              display="flex"
              justifyContent={{ base: "center", md: "flex-start" }}
            >
              <Text display={{ base: "none", md: "block" }}>
                Best Crops for Monsoon?
              </Text>
            </Button>
          </VStack>
        </Box>

        {/* Lower Side */}
        <VStack spacing={4} align="stretch" mt={8}>
          <Flex
            align="center"
            py={2}
            cursor="pointer"
            onClick={() => navigate("/Home")}
          >
            <Image src={home} alt="Home" boxSize="20px" />
            <Text ml={4} display={{ base: "none", md: "block" }}>
              Home
            </Text>
          </Flex>

          <Flex align="center" py={2} cursor="pointer">
            <Image src={saved} alt="Save" boxSize="20px" />
            <Text ml={4} display={{ base: "none", md: "block" }}>
              Saved
            </Text>
          </Flex>

          <Flex align="center" py={2} cursor="pointer">
            <Image src={rocket} alt="Upgrade" boxSize="20px" />
            <Text ml={4} display={{ base: "none", md: "block" }}>
              Upgrade to Pro
            </Text>
          </Flex>
        </VStack>
      </Box>

      {/* Main Chat Area */}
      <Box flex="1" display="flex" flexDirection="column">
        <Box flex="1" overflowY="auto" padding={4} bg="white">
          {message.map((message, i) => (
            <Flex
              key={i}
              mb={4}
              alignItems="center"
              flexDirection={message.isBot ? "row" : "row-reverse"}
            >
              <Image
                src={message.isBot ? gptImgLogo : userIcon}
                alt=""
                boxSize="40px"
                borderRadius="full"
                mr={4}
              />
              <Box
                bg={message.isBot ? "gray.100" : "blue.100"}
                borderRadius="md"
                padding={3}
                maxWidth="70%"
              >
                <Text>{message.text}</Text>
              </Box>
            </Flex>
          ))}
        </Box>

        <Box
          borderTop="1px solid"
          borderColor="gray.300"
          padding={4}
          bg="gray.100"
        >
          <Flex as="form" onSubmit={(e) => e.preventDefault()}>
            <Input
              placeholder="Send a message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              flex="1"
              bg="white"
              mr={4}
            />
            <Button onClick={handleSend} colorScheme="white">
              <Image src={sendBtn} alt="send" boxSize="20px" />
            </Button>
          </Flex>
          <Text fontSize="sm" color="gray.500" mt={2}>
            FarmGPT may produce inaccurate information about people, places, or
            facts.
          </Text>
        </Box>
      </Box>
    </Flex>
  );
}

export default Chatbot;
