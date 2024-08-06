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
} from "@chakra-ui/react";
import axios from "axios";

const AddBlogPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [author, setAuthor] = useState(""); // This should be the logged-in user ID
  const user = JSON.parse(localStorage.getItem("userInfo"));
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
        "http://localhost:5000/api/blog",
        blogPost
      );
      console.log("Blog post created:", response.data);
      // Clear the form after successful submission
      setTitle("");
      setContent("");
      setTags([]);
      setAuthor(user._id);
    } catch (error) {
      console.error("There was an error creating the blog post!", error);
    }
  };

  return (
    <Box maxW="600px" mx="auto" mt="10">
      <form onSubmit={handleSubmit}>
        <FormControl id="title" isRequired>
          <FormLabel>Title</FormLabel>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormControl>
        <FormControl id="content" isRequired mt="4">
          <FormLabel>Content</FormLabel>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </FormControl>
        <FormControl id="tags" mt="4">
          <FormLabel>Tags</FormLabel>
          <HStack spacing={2}>
            <Input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Add a tag"
            />
            <Button onClick={handleAddTag}>Add Tag</Button>
          </HStack>
          <HStack spacing={2} mt="2">
            {tags.map((tag) => (
              <Tag
                key={tag}
                borderRadius="full"
                variant="solid"
                colorScheme="blue"
              >
                <TagLabel>{tag}</TagLabel>
                <TagCloseButton onClick={() => handleRemoveTag(tag)} />
              </Tag>
            ))}
          </HStack>
        </FormControl>
        <Button type="submit" colorScheme="blue" mt="4">
          Create Blog Post
        </Button>
      </form>
    </Box>
  );
};

export default AddBlogPage;
