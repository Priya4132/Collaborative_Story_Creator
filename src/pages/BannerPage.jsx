import { Box, Heading, Text, Button, VStack, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Banner from '../assets/Banner.png'
import { motion } from "framer-motion";


const BannerPage = () => {
  const navigate = useNavigate();
  const MotionHeading = motion(Heading);

  return (
    <Box
      bgGradient="linear(to-r, teal.500, blue.500)"
      
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      px={4}
    >
      <VStack spacing={6} maxW="lg">
        <Image mt={"10px"} src= {Banner} alt="Banner Image" borderRadius="lg" boxSize="300px" objectFit="cover" />
        {/* <Heading size="2xl">Welcome to Collaborative Story Creator</Heading> */}
        <MotionHeading 
          size="2xl" 
          color={"blue.800"}
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 10 }}
        >
          Welcome to Collaborative Story Creator
        </MotionHeading>
        <Text fontSize="lg">Join writers from around the world in crafting unique, interactive stories!</Text>
        <Button colorScheme="teal" bg={"red.500"} size="lg" onClick={() => navigate("/stories")}>Start Writing</Button>
      </VStack>
    </Box>
  );
};

export default BannerPage;
