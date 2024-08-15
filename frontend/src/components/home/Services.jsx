import React from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  SimpleGrid,
  VStack,
  Icon,
} from "@chakra-ui/react";
import {
  FaCloud,
  FaNewspaper,
  FaPhoneAlt,
  FaSeedling,
  FaRegLightbulb,
  FaChalkboardTeacher,
  FaUsers,
} from "react-icons/fa";

const services = [
  {
    title: "Market Information",
    description:
      "Our market information provides up-to-date data and insights to help farmers make informed decisions.",
    icon: FaNewspaper,
  },
  {
    title: "Government Schemes",
    description:
      "Our government schemes service provides information and assistance on various agricultural programs and initiatives.",
    icon: FaRegLightbulb,
  },
  {
    title: "Weather",
    description:
      "Our weather service provides real-time data and forecasting to help farmers make informed decisions.",
    icon: FaCloud,
  },
  {
    title: "Expert Advice",
    description:
      "Our expert advice service offers personalized guidance to help farmers optimize their crop yield and success.",
    icon: FaPhoneAlt,
  },
  {
    title: "Crop Management",
    description:
      "Our crop management service employs modern, sustainable techniques to optimize yield and promote long-term soil health.",
    icon: FaSeedling,
  },
  {
    title: "News",
    description:
      "Stay updated: Get the latest news and updates on agriculture and farming industry.",
    icon: FaNewspaper,
  },
  {
    title: "Community Forum",
    description:
      "Connect with fellow farmers: Share, learn, and collaborate in our community forum.",
    icon: FaUsers,
  },
];

const ServicesPage = () => {
  return (
    <Box p={8}>
      <VStack align="flex-start" spacing={4} mb={8}>
        <Text fontSize="3xl" fontWeight="bold" color="green.700">
          Services of our website
        </Text>
      </VStack>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
        {services.map((service, index) => (
          <Box
            key={index}
            p={6}
            boxShadow="lg"
            bg="green.50"
            borderRadius="md"
            _hover={{ transform: "scale(1.05)", transition: "transform 0.2s" }}
          >
            <Icon as={service.icon} boxSize={12} color="orange.400" mb={4} />
            <Text fontSize="xl" fontWeight="bold" color="green.900" mb={2}>
              {service.title}
            </Text>
            <Text fontSize="md" color="gray.600">
              {service.description}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ServicesPage;
