import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Text,
  VStack,
  Button,
  Heading,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../home/Navbar";

const BlogPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://genpact-farming-1.onrender.com/api/blog"
        );
        setPosts(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading)
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );

  if (error)
    return (
      <Center h="100vh">
        <Text color="red.500" fontSize="lg">
          Error: {error}
        </Text>
      </Center>
    );

  return (
    <div>
      <Navbar />
      <Box maxW="800px" mx="auto" p={8}>
        <Heading mb={8} textAlign="center">
          Blog Posts
        </Heading>
        <VStack spacing={6} align="stretch">
          {posts.map((post) => (
            <Box
              key={post._id}
              p={6}
              borderWidth="1px"
              borderRadius="lg"
              boxShadow="md"
              transition="transform 0.2s"
              _hover={{ transform: "scale(1.02)", boxShadow: "lg" }}
            >
              <Text fontSize="2xl" fontWeight="bold" mb={4}>
                {post.title}
              </Text>
              <Text mb={4}>{post.content.substring(0, 100)}...</Text>
              <Link to={`/blog/${post._id}`}>
                <Button colorScheme="green">Read More</Button>
              </Link>
            </Box>
          ))}
        </VStack>
        <Center mt={8}>
          <Button colorScheme="green" onClick={() => navigate("/Blog")}>
            Add Blog
          </Button>
        </Center>
      </Box>
    </div>
  );
};

export default BlogPosts;
