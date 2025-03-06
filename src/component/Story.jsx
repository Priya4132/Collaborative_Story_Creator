

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStory, fetchStories } from "@/redux/actions/storyActions";
import { useNavigate } from "react-router-dom";
import { Box, Button, Input, Text, VStack, HStack } from "@chakra-ui/react";
import { logout } from "@/redux/actions/authActions";
import background_image from '../assets/background_image.png'


const Story = () => {
  const [title, setTitle] = useState("");
  const [initialSentence, setInitialSentence] = useState("");
  const [showCompleted, setShowCompleted] = useState(false); // State for toggling stories
  const user = useSelector((state) => state.auth.user);
  const stories = useSelector((state) => state.stories.stories);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchStories());
  }, [dispatch]);

  const handleLogout=()=>{
    dispatch(logout());
    navigate("/")
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user || !user.uid) {
      alert("You must be logged in to create a story.");
      return;
    }
    if (!title.trim() || !initialSentence.trim()) {
      alert("Please fill in both fields.");
      return;
    }
    if (initialSentence.trim().split(" ").length > 20) {
      alert("Initial sentence must be 20 words or less.");
      return;
    }

    // Pass user ID and name for correct attribution
    dispatch(createStory(title, initialSentence, user.uid, user.email|| "Anonymous"));
    setTitle("");
    setInitialSentence("");
    navigate("/stories"); // Redirect to stories page
  };



return (
    <>
    <Button ml={"90%"} colorScheme="blue" onClick={handleLogout} >
       Logout 
      </Button>
      <Box    minHeight="100vh" 
    width="100%" 
      backgroundImage={`url(${background_image})`}
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat">
    <VStack spacing={4} align="stretch" maxW="500px" mx="auto" mt={10} p={5} borderWidth="1px" borderRadius="md">
      <Text fontSize="2xl" fontWeight="bold">Create a New Story</Text>
      <Input placeholder="Story Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <Input placeholder="Initial Sentence (max 20 words)" value={initialSentence} onChange={(e) => setInitialSentence(e.target.value)} />
      <Text fontSize="sm" color="gray.500">Each story can have a maximum of 10 contributions.</Text>
      <Button colorScheme="blue" onClick={handleSubmit} isDisabled={!title.trim() || !initialSentence.trim()}>
        Start Story
      </Button>
      

      {/* Toggle Button for Completed and Ongoing Stories */}
      <HStack justifyContent="center" mt={6}>
        <Button 
        bg={"red.400"}
        colorScheme={showCompleted ? "gray" : "blue"} onClick={() => setShowCompleted(false)}>
          Ongoing Stories
        </Button>
        <Button 
         bg={"red.400"}
        colorScheme={showCompleted ? "blue" : "gray"} onClick={() => setShowCompleted(true)}>
          Completed Stories
        </Button>
      </HStack>

      {/* Conditionally Render Stories */}
      <Text fontSize="2xl" fontWeight="bold" mt={6}>{showCompleted ? "Completed Stories" : "Ongoing Stories"}</Text>
      {stories
        .filter(story => story.completed === showCompleted)
        .map(story => (
          <Box key={story.id} p={4} borderWidth="1px" borderRadius="md" bg={showCompleted ? "gray.100" : "white"}>
            <Text fontWeight="bold">{story.title}</Text>
            {story.contributions.map((entry, index) => (
              <Text key={index}>{entry.text} - <i>{entry.authorName || "Unknown"}</i></Text>
            ))}
            {!showCompleted && (
              <>
                <Button mt={2} bg={"red.400"} m={2} onClick={() => navigate(`/story/${story.id}`)}>Read</Button>
                {story.contributions.length < 10 && (
                  <Button bg={"red.400"} m={2} onClick={() => navigate(`/story/${story.id}`)}>Contribute</Button>
                )}
              </>
            )}
          </Box>
        ))}
    </VStack>
    </Box>
    </>
  );
};

export default Story;

