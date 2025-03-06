import { Flex, Text, useSelect } from '@chakra-ui/react'
import React from 'react'
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import '../App.css'

const Navbar = () => {
  const MotionText = motion(Text);
    const user=useSelector((state)=>state.auth.user);
    const userDetails=JSON.parse(localStorage.getItem("user"))||[];
   

  return (
    <Flex justifyContent={"space-between"}  p={1} bg={'whiteAlpha.100'}>
        {/* <Text>Collaborative Story Creator</Text> */}
        <MotionText
                fontSize="xl"
                fontWeight="bold"
                color="blue.800"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 5 }}
            >
                Collaborative Story Creator
            </MotionText>
       
        <Flex justifyContent={"space-evenly"} gap={4} p={2}> 
        <Link className='links' to="/">Home</Link> <Link  className='links'to="/login">Login</Link> 
    {/* <Link to="/register">Register</Link>  */}
    <Link className='links' to="/stories">Story</Link> 
    </Flex>
    </Flex>
     

      

  )
}

export default Navbar
