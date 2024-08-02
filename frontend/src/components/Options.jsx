import React, { useState, useContext } from "react";
import {
  Box,
  Button,
  Input,
  Grid,
  Text,
  Container,
  IconButton,
  VStack,
} from "@chakra-ui/react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { PhoneIcon, CopyIcon, CloseIcon } from "@chakra-ui/icons";

import { SocketContext } from "../SocketContext";

const Options = ({ children }) => {
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } =
    useContext(SocketContext);
  const [idToCall, setIdToCall] = useState("");

  return (
    <Container maxW="600px" mt="35px">
      <Box p="20px" border="2px solid black" boxShadow="lg" rounded="md">
        <VStack spacing={6}>
          <Grid
            templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
            gap={6}
            w="100%"
          >
            <Box>
              <Text fontSize="lg" mb={2}>
                Account Info
              </Text>
              <Input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                mb={4}
              />
              <CopyToClipboard text={me}>
                <Button
                  colorScheme="blue"
                  leftIcon={<CopyIcon />}
                  w="100%"
                  mb={4}
                  onClick={() => {
                    navigator.clipboard.writeText(me);
                  }}
                >
                  Copy Your ID
                </Button>
              </CopyToClipboard>
            </Box>
            <Box>
              <Text fontSize="lg" mb={2}>
                Make a call
              </Text>
              <Input
                placeholder="ID to call"
                value={idToCall}
                onChange={(e) => setIdToCall(e.target.value)}
                mb={4}
              />
              {callAccepted && !callEnded ? (
                <Button
                  colorScheme="red"
                  leftIcon={<CloseIcon />}
                  w="100%"
                  onClick={leaveCall}
                >
                  Hang Up
                </Button>
              ) : (
                <Button
                  colorScheme="blue"
                  leftIcon={<PhoneIcon />}
                  w="100%"
                  onClick={() => callUser(idToCall)}
                >
                  Call
                </Button>
              )}
            </Box>
          </Grid>
          {children}
        </VStack>
      </Box>
    </Container>
  );
};

export default Options;
