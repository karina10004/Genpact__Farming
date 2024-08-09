import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Text,
  VStack,
  Button,
  Textarea,
  Input,
  useToast,
  Divider,
  Spinner,
} from "@chakra-ui/react";
import { useParams, Link } from "react-router-dom";

const BlogPost = () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const { id } = useParams(); // Blog post ID from the URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [author, setAuthor] = useState(user._id); // Author ID or name
  const [called, setCalled] = useState(true);
  const toast = useToast();

  // Fetch blog post and comments
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postResponse = await axios.get(
          `http://localhost:5000/api/blog/${id}`
        );
        setPost(postResponse.data);
        setLoading(false);

        const commentsResponse = await axios.get(
          `http://localhost:5000/api/blog/${id}/comments`
        );
        setComments(commentsResponse.data);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, called]);

  const handleAddComment = async () => {
    if (!newComment || !author) {
      toast({
        title: "Comment or author is missing",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/blog/${id}/comments`,
        {
          author, // You would pass the actual author ID here if using authentication
          content: newComment,
        }
      );
      setCalled(!called);
      setComments([...comments, response.data]);
      setNewComment("");
      toast({
        title: "Comment added",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Error adding comment",
        description: err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/blog/${id}/comments/${commentId}`
      );
      setComments(comments.filter((comment) => comment._id !== commentId));
      toast({
        title: "Comment deleted",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Error deleting comment",
        description: err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (loading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Spinner size="xl" color="green.500" />
      </Box>
    );
  if (error)
    return (
      <Box textAlign="center" color="red.500">
        Error: {error}
      </Box>
    );

  return (
    <Box
      maxW="800px"
      mx="auto"
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      bg="white"
    >
      <Text fontSize="4xl" mb={4} fontWeight="bold" color="green.700">
        {post.title}
      </Text>
      <Text mb={4} fontSize="lg" lineHeight="tall">
        {post.content}
      </Text>
      <Divider my={6} borderColor="green.200" />
      <Link to="/BlogPost">
        <Button colorScheme="green" mb={4} variant="outline">
          Back to Blog
        </Button>
      </Link>

      <VStack spacing={4} align="stretch">
        <Text fontSize="2xl" fontWeight="bold" color="green.700">
          Comments
        </Text>
        {comments.map((comment) => (
          <Box
            key={comment._id}
            p={3}
            borderWidth="1px"
            borderRadius="lg"
            bg="green.50"
          >
            <Text fontSize="md">{comment.content}</Text>
            <Text fontSize="sm" color="gray.500">
              - {comment.author.name},{" "}
              {new Date(comment.createdAt).toLocaleString()}
            </Text>
            {comment.author._id === user._id && (
              <Button
                size="sm"
                colorScheme="red"
                mt={2}
                onClick={() => handleDeleteComment(comment._id)}
              >
                Delete
              </Button>
            )}
          </Box>
        ))}

        <Box mt={4} w="100%">
          <Textarea
            placeholder="Add a comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            mb={2}
            resize="vertical"
          />
          <Button colorScheme="green" onClick={handleAddComment}>
            Add Comment
          </Button>
        </Box>
      </VStack>
    </Box>
  );
};

export default BlogPost;
