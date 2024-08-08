import React from "react";
import { Box, Flex, Text, Image, Heading, VStack } from "@chakra-ui/react";
import Navbar from "./Navbar"; // Assuming Navbar is in a separate file

function HomePage() {
  return (
    <>
      <Navbar />
      <Box
        position="relative"
        height="100vh"
        width="100%"
        background="blackAlpha.700"
      >
        <Image
          src="https://th.bing.com/th/id/OIP.1U4iySVJ2ehPWfXnCQm1xAHaEo?rs=1&pid=ImgDetMain"
          alt="Farmer"
          objectFit="cover"
          width="100%"
          height="100%"
          filter="blur(8px)"
          zIndex={-1}
          mt="1px"
        />
        <VStack
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          color="white"
          spacing={4}
          textAlign="center"
          p={4}
        >
          <Heading fontSize={{ base: "2xl", md: "4xl", lg: "5xl" }}>
            Welcome to the Future of Farming
          </Heading>
          <Text fontSize={{ base: "md", md: "lg", lg: "xl" }}>
            Access the latest weather predictions, crop insights, and community
            discussions. Stay informed, stay ahead, and grow with us.
          </Text>
        </VStack>
      </Box>
    </>
  );
}

export default HomePage;
