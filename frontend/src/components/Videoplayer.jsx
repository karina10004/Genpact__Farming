import React, { useContext } from "react";
import { Box, Text, Grid, GridItem } from "@chakra-ui/react";

import { SocketContext } from "../SocketContext";

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } =
    useContext(SocketContext);

  return (
    <Grid
      templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
      justifyContent="center"
      gap={4}
    >
      {stream && (
        <Box p={3} border="2px solid black" m={2}>
          <Text fontSize="xl" mb={2}>
            {name || "Name"}
          </Text>
          <Box
            as="video"
            playsInline
            muted
            ref={myVideo}
            autoPlay
            width={{ base: "100%", xs: "300px", md: "550px" }}
          />
        </Box>
      )}
      {callAccepted && !callEnded && (
        <Box p={3} border="2px solid black" m={2}>
          <Text fontSize="xl" mb={2}>
            {call.name || "Name"}
          </Text>
          <Box
            as="video"
            playsInline
            ref={userVideo}
            autoPlay
            width={{ base: "100%", xs: "300px", md: "550px" }}
          />
        </Box>
      )}
    </Grid>
  );
};

export default VideoPlayer;
