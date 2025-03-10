import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchStories } from "@/redux/actions/storyActions";
import { Box, Text, VStack ,Button} from "@chakra-ui/react";
import background_image from '../assets/background_image.png'

const StoryDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate=useNavigate();
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
    
        <Box 
        minHeight="100vh" 
    width="100%" 
    backgroundImage={`url(${background_image})`}
    backgroundSize="cover"
    backgroundPosition="center"
    backgroundRepeat="no-repeat" 
    display="flex" 
    flexDirection="column">
    <VStack spacing={4} align="stretch" maxW="500px" mx="auto" mt={10} p={5} borderWidth="1px" borderRadius="md">
      <Text fontSize="2xl" fontWeight="bold">{story.title}</Text>
      {story.contributions.map((entry, index) => (
        <Box key={index} p={4} borderRadius="md">
          <Text>{entry.text} - <i>{entry.authorName || "Unknown"}</i></Text>
                    <Button mt={2}  m={2}  onClick={() => navigate(`/stories`)}>Go Back</Button>
          
        </Box>
      ))}
    </VStack>
    </Box>
  );
};

export default StoryDetails;
