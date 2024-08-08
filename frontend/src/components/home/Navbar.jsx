import React from "react";
import {
  Box,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Heading,
  IconButton,
  useDisclosure,
  Stack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg="green.600" px={4} color="white">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems="center">
          <Box>
            <Heading size="md">Farming App</Heading>
          </Box>
          <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
            <Menu>
              <MenuButton
                as={Button}
                bg="green.700"
                _hover={{ bg: "green.800" }}
              >
                Predictions
              </MenuButton>
              <MenuList bg="green.700" borderColor="green.800">
                <MenuItem
                  _hover={{ bg: "green.800" }}
                  as={Link}
                  to="/weather"
                  color="black"
                >
                  Weather Prediction
                </MenuItem>
                <MenuItem
                  _hover={{ bg: "green.800" }}
                  as={Link}
                  to="/crop"
                  color="black"
                >
                  Crop Prediction
                </MenuItem>
                <MenuItem
                  _hover={{ bg: "green.800" }}
                  as={Link}
                  to="/fertilizer"
                  color="black"
                >
                  Fertilizer Prediction
                </MenuItem>
              </MenuList>
            </Menu>
            <Link
              to="#"
              _hover={{ textDecoration: "none", bg: "green.700" }}
              p={2}
              rounded={"md"}
            >
              Community
            </Link>
            <Link
              to="/news"
              _hover={{ textDecoration: "none", bg: "green.700" }}
              p={2}
              rounded={"md"}
            >
              News
            </Link>
            <Link
              to="#"
              _hover={{ textDecoration: "none", bg: "green.700" }}
              p={2}
              rounded={"md"}
            >
              Blogs
            </Link>
            <Link
              to="/expert-call"
              _hover={{ textDecoration: "none", bg: "green.700" }}
              p={2}
              rounded={"md"}
            >
              Expert
            </Link>
            <Link
              to="#"
              _hover={{ textDecoration: "none", bg: "green.700" }}
              p={2}
              rounded={"md"}
            >
              Suggestions
            </Link>
          </HStack>
        </HStack>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as="nav" spacing={4}>
            <Menu>
              <MenuButton
                as={Button}
                bg="green.700"
                _hover={{ bg: "green.800" }}
              >
                Predictions
              </MenuButton>
              <MenuList bg="green.700" borderColor="green.800">
                <MenuItem _hover={{ bg: "green.800" }} as={Link} to="/weather">
                  Weather Prediction
                </MenuItem>
                <MenuItem _hover={{ bg: "green.800" }} as={Link} to="/crop">
                  Crop Prediction
                </MenuItem>
                <MenuItem
                  _hover={{ bg: "green.800" }}
                  as={Link}
                  to="/fertilizer"
                >
                  Fertilizer Prediction
                </MenuItem>
              </MenuList>
            </Menu>
            <Link
              to="#"
              _hover={{ textDecoration: "none", bg: "green.700" }}
              p={2}
              rounded={"md"}
            >
              Community
            </Link>
            <Link
              to="#"
              _hover={{ textDecoration: "none", bg: "green.700" }}
              p={2}
              rounded={"md"}
            >
              News
            </Link>
            <Link
              to="#"
              _hover={{ textDecoration: "none", bg: "green.700" }}
              p={2}
              rounded={"md"}
            >
              Blogs
            </Link>
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}

export default Navbar;
