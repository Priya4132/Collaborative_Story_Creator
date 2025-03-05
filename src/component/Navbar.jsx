import { Flex, Text, useSelect } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const user=useSelector((state)=>state.auth.user);
    const userDetails=JSON.parse(localStorage.getItem("user"))||[];
   

  return (
    <Flex justifyContent={"space-between"}  p={1} bg={"blue.300"}>
        <Text>Collaborative Story Creator</Text>
        <Link to="/">Home</Link> 
        <Flex justifyContent={"space-evenly"} gap={4} p={2}> <Link to="/login">Login</Link> 
    <Link to="/register">Register</Link> 
    <Link to="/stories">Story</Link> 
    </Flex>
    </Flex>
     

      

  )
}

export default Navbar
