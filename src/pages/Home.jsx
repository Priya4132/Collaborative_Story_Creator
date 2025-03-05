import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStories } from "@/redux/actions/storyActions";
import { useNavigate } from "react-router-dom";
import { Button, Box, Heading, Text, VStack } from "@chakra-ui/react";

const Home= () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stories = useSelector((state) => state.stories.stories);
  const user=useSelector((state)=>state.auth.user);
  console.log(user,"user ")
     const userDetails=JSON.parse(localStorage.getItem("user"))||[];
    // console.log(userDetails,"user details")
  useEffect(() => {
    dispatch(fetchStories());
  }, [dispatch]);
  const handleContribution=()=>{
if(!user.uid){
    alert("Please login to contribute to stories");
    navigate("/login")
}
//alert("Please login to contribute to stories");
  }

  const ongoingStories = stories.filter((story) => !story.completed);

  return (
    <Box p={5}>
      <Heading size="lg" mb={4}>Ongoing Stories</Heading>
      {ongoingStories.length > 0 ? (
        <VStack spacing={4} align="stretch">
          {ongoingStories.map((story) => (
            <Box key={story.id} p={4} borderWidth={1} borderRadius="md">
              <Text fontSize="xl" fontWeight="bold">{story.title}</Text>
              <Text>{story.contributions.length} contributions</Text>
              <Button mt={2} onClick={ handleContribution}>Contribute</Button>
            </Box>
          ))}
        </VStack>
      ) : (
        <Text>No ongoing stories available.</Text>
      )}
    </Box>
  );
};

export default Home;

