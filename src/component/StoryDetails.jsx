import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchStories } from "@/redux/actions/storyActions";
import { Box, Text, VStack } from "@chakra-ui/react";

const StoryDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const stories = useSelector((state) => state.stories.stories);
  
  useEffect(() => {
    if (stories.length === 0) {
      dispatch(fetchStories());
    }
  }, [dispatch, stories.length]);

  const story = stories.find((s) => s.id === id);

  if (!story) {
    return <Text>Loading or Story not found...</Text>;
  }

  return (
    <VStack spacing={4} align="stretch" maxW="500px" mx="auto" mt={10} p={5} borderWidth="1px" borderRadius="md">
      <Text fontSize="2xl" fontWeight="bold">{story.title}</Text>
      {story.contributions.map((entry, index) => (
        <Box key={index} p={4} borderWidth="1px" borderRadius="md">
          <Text>{entry.text} - <i>{entry.authorName || "Unknown"}</i></Text>
        </Box>
      ))}
    </VStack>
  );
};

export default StoryDetails;
