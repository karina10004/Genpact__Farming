import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Text, VStack, Button } from "@chakra-ui/react";
import { useParams, Link } from "react-router-dom";

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/blog/${id}`
        );
        setPost(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg">
      <Text fontSize="4xl" mb={4}>
        {post.title}
      </Text>
      <Text mb={4}>{post.content}</Text>
      <Link to="/blog">
        <Button colorScheme="teal">Back to Blog</Button>
      </Link>
    </Box>
  );
};

export default BlogPost;
