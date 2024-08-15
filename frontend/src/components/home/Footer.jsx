import React from "react";
import {
  Box,
  Text,
  VStack,
  HStack,
  Icon,
  Link,
  SimpleGrid,
} from "@chakra-ui/react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <Box as="footer" bg="green.700" color="white" py={10} px={6}>
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        spacing={10}
        maxW="1200px"
        mx="auto"
      >
        {/* About Us Section */}
        <Box>
          <Text fontSize="2xl" fontWeight="bold" mb={4}>
            About Us
          </Text>
          <Text fontSize="md" lineHeight="tall">
            Our platform is dedicated to providing farmers with the latest
            information they need to succeed in modern agriculture. Whether
            you're looking for real-time market information, want to connect
            with fellow farmers, or need expert advice to optimize your crop
            yield, our platform is here to support you.
          </Text>
        </Box>

        {/* Contact Us Section */}
        <Box>
          <Text fontSize="2xl" fontWeight="bold" mb={4}>
            Contact Us
          </Text>
          <VStack spacing={3} align="flex-start">
            <HStack spacing={3}>
              <Icon as={FaPhoneAlt} boxSize={5} color="orange.400" />
              <Text fontSize="md">+1 234 567 890</Text>
            </HStack>
            <HStack spacing={3}>
              <Icon as={FaEnvelope} boxSize={5} color="orange.400" />
              <Link href="mailto:info@farmingsupport.com" fontSize="md">
                info@farmingsupport.com
              </Link>
            </HStack>
            <HStack spacing={3}>
              <Icon as={FaMapMarkerAlt} boxSize={5} color="orange.400" />
              <Text fontSize="md">
                123 Farming Way, Agriculture City, Country
              </Text>
            </HStack>
          </VStack>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default Footer;
