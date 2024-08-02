import React, { useContext } from "react";
import { Button, Box, Text } from "@chakra-ui/react";

import { SocketContext } from "../SocketContext";

const Notifications = () => {
  const { answerCall, call, callAccepted } = useContext(SocketContext);

  return (
    <>
      {call.isReceivingCall && !callAccepted && (
        <Box display="flex" justifyContent="space-around" alignItems="center">
          <Text fontSize="2xl">{call.name} is calling:</Text>
          <Button colorScheme="blue" onClick={answerCall}>
            Answer
          </Button>
        </Box>
      )}
    </>
  );
};

export default Notifications;
