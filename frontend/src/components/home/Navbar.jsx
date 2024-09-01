import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Box, Text } from "@chakra-ui/layout";
import { Flex, Spacer } from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import ProfileModal from "../miscellaneous/ProfileModal";

import { useNavigate } from "react-router";
import React from "react";
import { HStack, IconButton, Stack, Heading } from "@chakra-ui/react";
import { NavLink, useLocation } from "react-router-dom";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import { ChatState } from "../../context/ChatProvider";
import { useState } from "react";
import { useToast } from "@chakra-ui/toast";

function Navbar() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };
  const { setSelectedChat, notification, setNotification, chats, setChats } =
    ChatState();

  const user = JSON.parse(localStorage.getItem("userInfo"));

  const handleSearch = async () => {
    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(false);
      //   console.log(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const activeButtonStyles = {
    bg: "green.200",
    color: "black",
    _hover: { bg: "green.200", color: "black" }, // Prevents hover color change when active
  };

  const inactiveButtonStyles = {
    bg: "transparent",
    color: "white",
    _hover: { bg: "green.200" },
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
        <HStack spacing={4} alignItems="center">
          {" "}
          {/* Reduced spacing */}
          <Box>
            <Heading size="md" color="white">
              Farming App
            </Heading>
          </Box>
          <HStack as="nav" spacing={2} display={{ base: "none", md: "flex" }}>
            {" "}
            {/* Reduced spacing */}
            <Button
              as={NavLink}
              to="/Home"
              {...(isActiveRoute("/Home")
                ? activeButtonStyles
                : inactiveButtonStyles)}
            >
              Home
            </Button>
            <Button
              as={NavLink}
              to="/chats"
              {...(isActiveRoute("/chats")
                ? activeButtonStyles
                : inactiveButtonStyles)}
            >
              Community
            </Button>
            <Button
              as={NavLink}
              to="/BlogPost"
              {...(isActiveRoute("/BlogPost")
                ? activeButtonStyles
                : inactiveButtonStyles)}
            >
              Blogs
            </Button>
            <Button
              as={NavLink}
              to="/list"
              {...(isActiveRoute("/list")
                ? activeButtonStyles
                : inactiveButtonStyles)}
            >
              Expert
            </Button>
            <Button
              as={NavLink}
              to="/aiChatbot"
              {...(isActiveRoute("/aiChatbot")
                ? activeButtonStyles
                : inactiveButtonStyles)}
            >
              Help
            </Button>
            <Button
              as={NavLink}
              to="/Market"
              {...(isActiveRoute("/Market")
                ? activeButtonStyles
                : inactiveButtonStyles)}
            >
              Mandi Info
            </Button>
            <Menu>
              <MenuButton
                as={Button}
                bg={
                  isActiveRoute("/weather") ||
                  isActiveRoute("/crop") ||
                  isActiveRoute("/fertilizer")
                    ? "green.200"
                    : "transparent"
                }
                color={
                  isActiveRoute("/weather") ||
                  isActiveRoute("/crop") ||
                  isActiveRoute("/fertilizer")
                    ? "black"
                    : "white"
                }
                _hover={{
                  bg:
                    isActiveRoute("/weather") ||
                    isActiveRoute("/crop") ||
                    isActiveRoute("/fertilizer")
                      ? "green.200"
                      : "green.700",
                }}
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
                bg={
                  isActiveRoute("/news") || isActiveRoute("/GS")
                    ? "green.200"
                    : "transparent"
                }
                color={
                  isActiveRoute("/news") || isActiveRoute("/GS")
                    ? "black"
                    : "white"
                }
                _hover={{
                  bg:
                    isActiveRoute("/news") || isActiveRoute("/GS")
                      ? "green.200"
                      : "green.700",
                }}
              >
                News
              </MenuButton>
              <MenuList bg="green.700" borderColor="green.700">
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
            <Menu>
              <MenuButton as={Button} bg="transparent" marginLeft={590}>
                <Avatar
                  size="sm"
                  cursor="pointer"
                  name={user.name}
                  src={user.pic}
                />
              </MenuButton>
              <MenuList>
                <ProfileModal user={user}>
                  <MenuItem>My Profile</MenuItem>{" "}
                </ProfileModal>
                <MenuDivider />
                <MenuItem onClick={logoutHandler}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </HStack>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as="nav" spacing={2}>
            {" "}
            {/* Reduced spacing */}
            <Button
              as={NavLink}
              to="/Home"
              {...(isActiveRoute("/Home")
                ? activeButtonStyles
                : inactiveButtonStyles)}
            >
              Home
            </Button>
            <Button
              as={NavLink}
              to="/chats"
              {...(isActiveRoute("/chats")
                ? activeButtonStyles
                : inactiveButtonStyles)}
            >
              Community
            </Button>
            <Button
              as={NavLink}
              to="/BlogPost"
              {...(isActiveRoute("/BlogPost")
                ? activeButtonStyles
                : inactiveButtonStyles)}
            >
              Blogs
            </Button>
            <Button
              as={NavLink}
              to="/list"
              {...(isActiveRoute("/list")
                ? activeButtonStyles
                : inactiveButtonStyles)}
            >
              Expert
            </Button>
            <Button
              as={NavLink}
              to="/aiChatbot"
              {...(isActiveRoute("/aiChatbot")
                ? activeButtonStyles
                : inactiveButtonStyles)}
            >
              Suggestions
            </Button>
            <Menu>
              <MenuButton
                as={Button}
                bg={
                  isActiveRoute("/weather") ||
                  isActiveRoute("/crop") ||
                  isActiveRoute("/fertilizer")
                    ? "green.200"
                    : "green.700"
                }
                color={
                  isActiveRoute("/weather") ||
                  isActiveRoute("/crop") ||
                  isActiveRoute("/fertilizer")
                    ? "black"
                    : "white"
                }
                _hover={{
                  bg:
                    isActiveRoute("/weather") ||
                    isActiveRoute("/crop") ||
                    isActiveRoute("/fertilizer")
                      ? "green.200"
                      : "green.800",
                }}
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
                bg={
                  isActiveRoute("/news") || isActiveRoute("/GS")
                    ? "green.200"
                    : "green.700"
                }
                color={
                  isActiveRoute("/news") || isActiveRoute("/GS")
                    ? "black"
                    : "white"
                }
                _hover={{
                  bg:
                    isActiveRoute("/news") || isActiveRoute("/GS")
                      ? "green.200"
                      : "green.800",
                }}
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
