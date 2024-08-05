import React from "react";
import { Box, Heading, Flex } from "@chakra-ui/react";
//import App from "./App";
import Videoplayer from "./components/Videoplayer";
import Notification from "./components/Notification";
import Options from "./components/Options";

const Video = () => {
  return (
    <Flex direction="column" align="center" width="100%">
      <Flex
        borderRadius="15px"
        margin="30px 100px"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        width={{ base: "90%", md: "600px" }}
        border="2px solid black"
      >
        <Heading as="h2" size="2xl" textAlign="center">
          Video Chat
        </Heading>
      </Flex>
      <Videoplayer />
      <Options>
        <Notification />
      </Options>
    </Flex>
  );
};

export default Video;
