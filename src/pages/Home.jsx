import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addContribution, fetchStories } from "@/redux/actions/storyActions";
import { useNavigate } from "react-router-dom";
import { Button, Box, Heading, Text, VStack, Flex, Input } from "@chakra-ui/react";
import BannerPage from "./BannerPage";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [contribution, setContribution] = useState("");

  const stories = useSelector((state) => state.stories.stories);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchStories());
  }, [dispatch]);

  const handleAddContribution = (storyId) => {
    if (!user || !user.uid) {
      alert("Please login to contribute to stories");
      navigate("/login");
      return;
    }

    if (contribution.trim()) {
      dispatch(addContribution(storyId, contribution, user.id, user.email));
      setContribution("");
    }
  };

  const ongoingStories = stories.filter((story) => !story.completed);

  return (
    <>
      <BannerPage />
      <Heading size="lg" mb={4}>Ongoing Stories</Heading>
      {ongoingStories.length > 0 ? (
        <VStack spacing={4} align="stretch">
          {ongoingStories.map((story) => (
            <Box key={story.id} p={4} borderWidth={1} borderRadius="md">
              <Text fontSize="xl" fontWeight="bold">{story.title}</Text>
              <Text>{story.contributions.length} contributions</Text>
              
              <Input
                mt={2}
                placeholder="Write your contribution..."
                value={contribution}
                onChange={(e) => setContribution(e.target.value)}
              />
              <Button mt={2} onClick={() => handleAddContribution(story.id)}>Contribute</Button>
            </Box>
          ))}
        </VStack>
      ) : (
        <Text>No ongoing stories available.</Text>
      )}
      
      <Flex justify={"center"} p={2} mt={2}>
        <Text fontWeight={"bold"}>&copy; Priya Tripathi @2025. All Rights Reserved.</Text>
      </Flex>
    </>
  );
};

export default Home;
