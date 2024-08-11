import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Tag,
  TagLabel,
  TagCloseButton,
  HStack,
  Heading,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBlogPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const navigate = useNavigate();

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const blogPost = {
      title,
      content,
      author: user._id,
      tags,
    };

    try {
      const response = await axios.post(
        "https://genpact-farming.onrender.com/api/blog",
        blogPost
      );
      console.log("Blog post created:", response.data);
      setTitle("");
      setContent("");
      setTags([]);
      navigate("/BlogPost");
    } catch (error) {
      console.error("There was an error creating the blog post!", error);
    }
  };

  return (
    <Box maxW="600px" mx="auto" mt="10" p={8} boxShadow="lg" borderRadius="lg">
      <Heading as="h1" size="lg" mb={6} textAlign="center" color="green.800">
        Create a New Blog Post
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl id="title" isRequired>
          <FormLabel color="green.700">Title</FormLabel>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            bg="white"
            borderColor="green.300"
            _hover={{ borderColor: "green.400" }}
            focusBorderColor="green.500"
            boxShadow="sm"
          />
        </FormControl>
        <FormControl id="content" isRequired mt="4">
          <FormLabel color="green.700">Content</FormLabel>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            bg="white"
            borderColor="green.300"
            _hover={{ borderColor: "green.400" }}
            focusBorderColor="green.500"
            boxShadow="sm"
            minHeight="200px"
          />
        </FormControl>
        <FormControl id="tags" mt="4">
          <FormLabel color="green.700">Tags</FormLabel>
          <HStack spacing={2}>
            <Input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Add a tag"
              bg="white"
              borderColor="green.300"
              _hover={{ borderColor: "green.400" }}
              focusBorderColor="green.500"
              boxShadow="sm"
            />
            <Button
              onClick={handleAddTag}
              bg="green.600"
              color="white"
              _hover={{ bg: "green.500" }}
              boxShadow="md"
            >
              Add Tag
            </Button>
          </HStack>
          <HStack spacing={2} mt="2">
            {tags.map((tag) => (
              <Tag
                key={tag}
                borderRadius="full"
                variant="solid"
                colorScheme="green"
              >
                <TagLabel>{tag}</TagLabel>
                <TagCloseButton onClick={() => handleRemoveTag(tag)} />
              </Tag>
            ))}
          </HStack>
        </FormControl>
        <Button
          type="submit"
          colorScheme="green"
          mt="6"
          width="full"
          boxShadow="md"
        >
          Create Blog Post
        </Button>
      </form>
    </Box>
  );
};

export default AddBlogPage;
