import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addContribution, fetchStories } from "@/redux/actions/storyActions";
import { useNavigate } from "react-router-dom";
import { Button, Box, Heading, Text, VStack,Flex } from "@chakra-ui/react";
import BannerPage from "./BannerPage";
import background_image from "../assets/background_image.png"

const Home= () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [contribution, setContribution] = useState("");

  const stories = useSelector((state) => state.stories.stories);
  const user=useSelector((state)=>state.auth.user);
  //console.log(user,"user ")
     const userDetails=JSON.parse(localStorage.getItem("user"))||[];
    // console.log(userDetails,"user details")
  useEffect(() => {
    dispatch(fetchStories());
  }, [dispatch]);
  


  
 
    const handleAddContribution = () => {
        if(!user.uid){
            alert("Please login to contribute to stories");
            navigate("/login")
        }

      else  if (contribution.trim()) {
          dispatch(addContribution(storyId, contribution, user.Id, user.email));
          setContribution("");
        }
      };
  


  const ongoingStories = stories.filter((story) => !story.completed);

  return (
    <>
    <BannerPage/>
    {/* <Box
  p={5}
  backgroundImage={`url(${background_image})`}
  backgroundSize="cover"
  backgroundPosition="center"
  backgroundRepeat="no-repeat"
> */}

      <Heading size="lg" mb={4}>Ongoing Stories</Heading>
      {ongoingStories.length > 0 ? (
        <VStack spacing={4} align="stretch">
          {ongoingStories.map((story) => (
            <Box key={story.id} p={4} borderWidth={1} borderRadius="md">
              <Text fontSize="xl" fontWeight="bold">{story.title}</Text>
              <Text>{story.contributions.length} contributions</Text>
              <Button mt={2} onClick={handleAddContribution}>Contribute</Button>
            </Box>
          ))}
        </VStack>
      ) : (
        <Text>No ongoing stories available.</Text>
      )}
    {/* </Box> */}
    <Flex justify={"center"} p={2} mt={2}>
      <Text fontWeight={"bold"}>&copy; Priya Tripathi @2025. All Rights Reserved.</Text>
    </Flex>
    </>
  );
};

export default Home;

