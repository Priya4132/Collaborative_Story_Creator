// import { Box, Heading, Text, Button, VStack, Image } from "@chakra-ui/react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import Banner from '../assets/Banner.png'
// import { motion } from "framer-motion";


// const BannerPage = () => {
//     const user=useSelector((state)=>state.auth.user)|| JSON.parse(localStorage.getItem("user"));
//     //const userDetails=JSON.parse(localStorage.getItem("user"))||[];
//   const navigate = useNavigate();
//   const MotionHeading = motion(Heading);
//   const handleStart=()=>{
//     if(!user){
//         alert("Please Login to start creating story");
//         navigate("/login");

//     }
//     else{
//         navigate("/stories")
//     }
   
//   }
//   return (
//     <Box
//       bgGradient="linear(to-r, teal.500, blue.500)"
      
//       minH="100vh"
//       display="flex"
//       alignItems="center"
//       justifyContent="center"
//       textAlign="center"
//       px={4}
//     >
//       <VStack spacing={6} maxW="lg">
//         <Image mt={"10px"} src= {Banner} alt="Banner Image" borderRadius="lg" boxSize="300px" objectFit="cover" />
//         {/* <Heading size="2xl">Welcome to Collaborative Story Creator</Heading> */}
//         <MotionHeading 
//           size="2xl" 
//           color={"blue.800"}
//           initial={{ opacity: 0, y: -20 }} 
//           animate={{ opacity: 1, y: 0 }} 
//           transition={{ duration: 10 }}
//         >
//           Welcome to Collaborative Story Creator
//         </MotionHeading>
//         <Text fontSize="lg">Join writers from around the world in crafting unique, interactive stories!</Text>
     
     
//         <Button colorScheme="teal" bg={"red.500"} size="lg" onClick={handleStart}>Start Writing</Button>
//       </VStack>
//     </Box>
//   );
// };

// export default BannerPage;
import { Box, Heading, Text, Button, VStack, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Banner from "../assets/Banner.png";

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionButton = motion(Button);
const MotionImage = motion(Image);

const BannerPage = () => {
  const user = useSelector((state) => state.auth.user) || JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleStart = () => {
    if (!user) {
      alert("Please Login to start creating stories.");
      navigate("/login");
    } else {
      navigate("/stories");
    }
  };

  return (
    <MotionBox
      bgGradient="linear(to-r, teal.500, blue.500)"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      px={4}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <VStack spacing={6} maxW="lg">
        {/* Banner Image Moves from Left to Right */}
        <MotionImage
          mt={"10px"}
          src={Banner}
          alt="Banner Image"
          borderRadius="lg"
          boxSize="300px"
          objectFit="cover"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />

        {/* Animated Heading */}
        <MotionHeading
          size="2xl"
          color={"blue.800"}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          Welcome to Collaborative Story Creator
        </MotionHeading>

        {/* Animated Text */}
        <MotionText
          fontSize="lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        >
          Join writers from around the world in crafting unique, interactive stories!
        </MotionText>

        {/* Animated Button */}
        <MotionButton
          colorScheme="teal"
          bg={"blue.500"}
          size="lg"
          onClick={handleStart}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Start Writing
        </MotionButton>
      </VStack>
    </MotionBox>
  );
};

export default BannerPage;

