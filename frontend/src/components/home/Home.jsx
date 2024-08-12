

import React from "react";
import { Box, Flex, Text, Heading, VStack } from "@chakra-ui/react";
import Navbar from "./Navbar";
import Weather from "./Weather";
import Slider from "react-slick"; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function HomePage() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
  };

  const images = [
    "https://th.bing.com/th/id/OIP.1U4iySVJ2ehPWfXnCQm1xAHaEo?rs=1&pid=ImgDetMain",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgY6fcdT6NaC1_Iv0D65_c06xBAKpbgz-LwA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5p2yaEUvfrDrmzxWDUPJt-yesZ8fAL8Lk_g&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Zo-KXKEj5-ewAZxFvbsluZtD1L-FI9lizA&s",
  ];

  return (
    <>
      <Navbar />
      <Box position="relative" height="100vh" width="100%">
        <Slider {...settings}>
          {images.map((src, index) => (
            <Box key={index} height="100vh" width="100%">
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "blur(3px)",
                }}
              />
            </Box>
          ))}
        </Slider>
        <VStack
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          color="white"
          spacing={4}
          textAlign="center"
          p={4}
          zIndex={1}
        >
          <Heading fontSize={{ base: "2xl", md: "4xl", lg: "5xl" }}>
            Welcome to the Future of Farming
          </Heading>
          <Text fontSize={{ base: "md", md: "lg", lg: "xl" }}>
            Access the latest weather predictions, crop insights, and community
            discussions. Stay informed, stay ahead, and grow with us.
          </Text>
          <Weather />
        </VStack>
      </Box>
    </>
  );
}

export default HomePage;
