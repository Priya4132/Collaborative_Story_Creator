

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStory, fetchStories,addContribution } from "@/redux/actions/storyActions";
import { useNavigate } from "react-router-dom";
import { Box, Button, Input, Text, VStack, HStack } from "@chakra-ui/react";
import { logout } from "@/redux/actions/authActions";
import background_image from '../assets/background_image.png'


const Story = () => {
  const [title, setTitle] = useState("");
  const [initialSentence, setInitialSentence] = useState("");
  const [showCompleted, setShowCompleted] = useState(false); // State for toggling stories
  const user = useSelector((state) => state.auth.user)||JSON.parse(localStorage.getItem("user"));
  const stories = useSelector((state) => state.stories.stories);
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const [contribution, setContribution] = useState("");

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



return (
    <>
    <Button ml={"90%"} bg={"red.400"} _hover={{ bg: "red.500" }} onClick={handleLogout}>
  Logout
</Button>
      <Box     minH="100vh" 
        w="100%" 
      backgroundImage={`url(${background_image})`}
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat">
    <VStack spacing={4} align="stretch" maxW="500px" mx="auto" mt={10} p={5} borderWidth="1px" borderRadius="md">
      <Text fontSize="2xl" fontWeight="bold">Create a New Story</Text>
      <Input placeholder="Story Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <Input placeholder="Initial Sentence (max 20 words)" value={initialSentence} onChange={(e) => setInitialSentence(e.target.value)} />
      <Text fontSize="sm" color="gray.500">Each story can have a maximum of 10 contributions.</Text>
      <Button bg={"red.400"} _hover={{ bg: "red.500" }} onClick={handleSubmit} isDisabled={!title.trim() || !initialSentence.trim()}>
  Start Story
</Button>
      

      {/* Toggle Button for Completed and Ongoing Stories */}
      <HStack justifyContent="center" mt={6}>
  <Button bg={showCompleted ? "gray.400" : "red.400"} _hover={{ bg: showCompleted ? "gray.500" : "red.500" }} onClick={() => setShowCompleted(false)}>
    Ongoing Stories
  </Button>
  <Button bg={showCompleted ? "red.400" : "gray.400"} _hover={{ bg: showCompleted ? "red.500" : "gray.500" }} onClick={() => setShowCompleted(true)}>
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
<Button mt={2} bg={"red.800"} _hover={{ bg: "red.900" }} onClick={() => navigate(`/story/${story.id}`)}>
  Read
</Button>                {story.contributions.length < 10 && (
                
              
                         <>   
                            <Input
                              mt={2}
                              placeholder="Write your contribution..."
                              value={contribution}
                              onChange={(e) => setContribution(e.target.value)}
                            />
<Button bg={"red.800"} mt={2} _hover={{ bg: "red.900" }} onClick={() => handleAddContribution(story.id)}>
  Contribute
</Button></>
                
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

