import React from "react";
import {
  Box,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useDisclosure,
  Stack,
  Button,
  Heading,
} from "@chakra-ui/react";
import { NavLink, useLocation } from "react-router-dom";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();

  const activeButtonStyles = {
    bg: "yellow",
    color: "black",
    _hover: { bg: "yellow", color: "black" },
  };

  const inactiveButtonStyles = {
    bg: "transparent",
    color: "white",
    _hover: { bg: "green.700" },
  };

  const isActiveRoute = (route) => location.pathname.startsWith(route);

  return (
    <Box bg="green.700" px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={4} alignItems="center"> {/* Reduced spacing */}
          <Box>
            <Heading size="md" color="white">
              Farming App
            </Heading>
          </Box>
          <HStack as="nav" spacing={2} display={{ base: "none", md: "flex" }}> {/* Reduced spacing */}
            <Button
              as={NavLink}
              to="/Home"
              {...(isActiveRoute("/Home") ? activeButtonStyles : inactiveButtonStyles)}
            >
              Home
            </Button>
            <Button
              as={NavLink}
              to="/chats"
              {...(isActiveRoute("/chats") ? activeButtonStyles : inactiveButtonStyles)}
            >
              Community
            </Button>
            <Button
              as={NavLink}
              to="/BlogPost"
              {...(isActiveRoute("/BlogPost") ? activeButtonStyles : inactiveButtonStyles)}
            >
              Blogs
            </Button>
            <Button
              as={NavLink}
              to="/list"
              {...(isActiveRoute("/list") ? activeButtonStyles : inactiveButtonStyles)}
            >
              Expert
            </Button>
            <Button
              as={NavLink}
              to="/aiChatbot"
              {...(isActiveRoute("/aiChatbot") ? activeButtonStyles : inactiveButtonStyles)}
            >
              Suggestions
            </Button>
            <Menu>
              <MenuButton
                as={Button}
                bg={isActiveRoute("/weather") || isActiveRoute("/crop") || isActiveRoute("/fertilizer") ? "yellow" : "transparent"}
                color={isActiveRoute("/weather") || isActiveRoute("/crop") || isActiveRoute("/fertilizer") ? "black" : "white"}
                _hover={{ bg: isActiveRoute("/weather") || isActiveRoute("/crop") || isActiveRoute("/fertilizer") ? "yellow" : "green.700" }}
              >
                Predictions
              </MenuButton>
              <MenuList bg="green.700" borderColor="green.800" zIndex="2">
                <MenuItem
                  as={NavLink}
                  to="/weather"
                  bg="green.800"
                  _hover={{ bg: "green.700" }}
                  style={({ isActive }) =>
                    isActive ? activeButtonStyles : inactiveButtonStyles
                  }
                >
                  Weather Prediction
                </MenuItem>
                <MenuItem
                  as={NavLink}
                  to="/crop"
                  bg="green.800"
                  _hover={{ bg: "green.700" }}
                  style={({ isActive }) =>
                    isActive ? activeButtonStyles : inactiveButtonStyles
                  }
                >
                  Crop Prediction
                </MenuItem>
                <MenuItem
                  as={NavLink}
                  to="/fertilizer"
                  bg="green.800"
                  _hover={{ bg: "green.700" }}
                  style={({ isActive }) =>
                    isActive ? activeButtonStyles : inactiveButtonStyles
                  }
                >
                  Fertilizer Prediction
                </MenuItem>
              </MenuList>
            </Menu>
            <Menu>
              <MenuButton
                as={Button}
                bg={isActiveRoute("/news") || isActiveRoute("/GS") ? "yellow" : "transparent"}
                color={isActiveRoute("/news") || isActiveRoute("/GS") ? "black" : "white"}
                _hover={{ bg: isActiveRoute("/news") || isActiveRoute("/GS") ? "yellow" : "green.700" }}
              >
                News
              </MenuButton>
              <MenuList bg="green.700" borderColor="green.800">
                <MenuItem
                  as={NavLink}
                  to="/news"
                  bg="green.800"
                  _hover={{ bg: "green.700" }}
                  style={({ isActive }) =>
                    isActive ? activeButtonStyles : inactiveButtonStyles
                  }
                >
                  News
                </MenuItem>
                <MenuItem
                  as={NavLink}
                  bg="green.800"
                  to="/GS"
                  _hover={{ bg: "green.700" }}
                  style={({ isActive }) =>
                    isActive ? activeButtonStyles : inactiveButtonStyles
                  }
                >
                  Government Schemes
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </HStack>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as="nav" spacing={2}> {/* Reduced spacing */}
            <Button
              as={NavLink}
              to="/Home"
              {...(isActiveRoute("/Home") ? activeButtonStyles : inactiveButtonStyles)}
            >
              Home
            </Button>
            <Button
              as={NavLink}
              to="/chats"
              {...(isActiveRoute("/chats") ? activeButtonStyles : inactiveButtonStyles)}
            >
              Community
            </Button>
            <Button
              as={NavLink}
              to="/BlogPost"
              {...(isActiveRoute("/BlogPost") ? activeButtonStyles : inactiveButtonStyles)}
            >
              Blogs
            </Button>
            <Button
              as={NavLink}
              to="/list"
              {...(isActiveRoute("/list") ? activeButtonStyles : inactiveButtonStyles)}
            >
              Expert
            </Button>
            <Button
              as={NavLink}
              to="/aiChatbot"
              {...(isActiveRoute("/aiChatbot") ? activeButtonStyles : inactiveButtonStyles)}
            >
              Suggestions
            </Button>
            <Menu>
              <MenuButton
                as={Button}
                bg={isActiveRoute("/weather") || isActiveRoute("/crop") || isActiveRoute("/fertilizer") ? "yellow" : "green.700"}
                color={isActiveRoute("/weather") || isActiveRoute("/crop") || isActiveRoute("/fertilizer") ? "black" : "white"}
                _hover={{ bg: isActiveRoute("/weather") || isActiveRoute("/crop") || isActiveRoute("/fertilizer") ? "yellow" : "green.800" }}
              >
                Predictions
              </MenuButton>
              <MenuList bg="green.700" borderColor="green.800">
                <MenuItem
                  as={NavLink}
                  to="/weather"
                  _hover={{ bg: "green.800" }}
                  style={({ isActive }) =>
                    isActive ? activeButtonStyles : inactiveButtonStyles
                  }
                >
                  Weather Prediction
                </MenuItem>
                <MenuItem
                  as={NavLink}
                  to="/crop"
                  _hover={{ bg: "green.800" }}
                  style={({ isActive }) =>
                    isActive ? activeButtonStyles : inactiveButtonStyles
                  }
                >
                  Crop Prediction
                </MenuItem>
                <MenuItem
                  as={NavLink}
                  to="/fertilizer"
                  _hover={{ bg: "green.800" }}
                  style={({ isActive }) =>
                    isActive ? activeButtonStyles : inactiveButtonStyles
                  }
                >
                  Fertilizer Prediction
                </MenuItem>
              </MenuList>
            </Menu>
            <Menu>
              <MenuButton
                as={Button}
                bg={isActiveRoute("/news") || isActiveRoute("/GS") ? "yellow" : "green.700"}
                color={isActiveRoute("/news") || isActiveRoute("/GS") ? "black" : "white"}
                _hover={{ bg: isActiveRoute("/news") || isActiveRoute("/GS") ? "yellow" : "green.800" }}
              >
                News
              </MenuButton>
              <MenuList bg="green.700" borderColor="green.800">
                <MenuItem
                  as={NavLink}
                  to="/news"
                  _hover={{ bg: "green.800" }}
                  style={({ isActive }) =>
                    isActive ? activeButtonStyles : inactiveButtonStyles
                  }
                >
                  News
                </MenuItem>
                <MenuItem
                  as={NavLink}
                  bg="green.800"
                  to="/GS"
                  _hover={{ bg: "green.800" }}
                  style={({ isActive }) =>
                    isActive ? activeButtonStyles : inactiveButtonStyles
                  }
                >
                  Government Schemes
                </MenuItem>
              </MenuList>
            </Menu>
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}

export default Navbar;
