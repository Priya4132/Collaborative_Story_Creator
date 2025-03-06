import { register } from '@/redux/actions/authActions';
import { Box ,Button,Input,Text,VStack} from '@chakra-ui/react'
import React, { useState } from 'react'

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Register = () => {
    //state for email and password
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const dispatch=useDispatch();
    const navigate=useNavigate();
    //handle register

    const handleRegister=()=>{
        dispatch(register(email,password));
        navigate("/login");//redirecting to Login Page
        


    }
  return (
//    <Box width={"50%"} m={"10px auto"}>
//     <Text textAlign={"center"}>Register</Text>
//     <Input type="text" placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
//     <Input type="password" placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
// <Button onClick={handleRegister} color={"white"} bg={"blue"} m={2} 

// >Register</Button>
// <Text textAlign="center" mt={2}>
//                        Already have an account?  <Button variant="link" colorScheme="blue" 
// color={"blue.700"}
//                        onClick={() => navigate("/login")}>Click here to Login</Button>
//                     </Text>
//    </Box>

<Box minH="100vh" display="flex" alignItems="center" justifyContent="center" bgGradient="linear(to-r, teal.400, blue.500)">
<Box bg="white" p={8} borderRadius="md" boxShadow="lg" maxW="400px" width="full">
    <VStack spacing={4} align="stretch">
        <Text
            size="lg" 
            textAlign="center" 
            color="blue.800" 
           
        >
           Register
        </Text>
        <Input type="text" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button onClick={handleRegister} colorScheme="teal" width="full" mt={4}>Register</Button>
        <Text textAlign="center" mt={2}>
                       Already have an account?  <Button variant="link" colorScheme="blue" 
 color={"blue.700"}
                       onClick={() => navigate("/login")}>Click here to Login</Button>
                    </Text>
    </VStack>
</Box>
</Box>
  )
}

export default Register
