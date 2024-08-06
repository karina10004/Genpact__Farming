// src/components/VideoPlayer.js
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Text, Grid } from "@chakra-ui/react";
import { SocketContext } from "../SocketContext";
// import JoinCall from "../JoinCall";

const VideoPlayer = (props) => {
  const {
    name,
    callAccepted,
    myVideo,
    userVideo,
    callEnded,
    stream,
    call,
    joinCall,
    setup,
  } = useContext(SocketContext);
  const roomId = useParams();
  useEffect(() => {
    setup(roomId);
    // joinCall(roomId);
  }, []);
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
