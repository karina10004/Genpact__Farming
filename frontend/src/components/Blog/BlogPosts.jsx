import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Text, VStack, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const BlogPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/blog");
        setPosts(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <VStack spacing={4} align="stretch">
      {posts.map((post) => (
        <Box key={post._id} p={4} borderWidth="1px" borderRadius="lg">
          <Text fontSize="2xl" mb={2}>
            {post.title}
          </Text>
          <Text mb={4}>{post.content.substring(0, 100)}...</Text>
          <Link to={`/blog/${post._id}`}>
            <Button colorScheme="teal">Read More</Button>
          </Link>
        </Box>
      ))}
    </VStack>
  );
};

export default BlogPosts;
