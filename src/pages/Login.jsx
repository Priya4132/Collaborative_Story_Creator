import { login, register } from '@/redux/actions/authActions';
import { Box ,Button,Input,Text,VStack} from '@chakra-ui/react'
import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';



const MotionText = motion(Text);

const Login = () => {
    //state for email and password
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const dispatch=useDispatch();
    const navigate=useNavigate();
    //handle register

    const handleLogin=()=>{
        dispatch(login(email,password));
        navigate("/stories");//redirecting to Login Page
        


    }
  return (
//    <Box width={"50%"} m={"10px auto"} >
//     <Text textAlign={"center"}>Please Login</Text>
//     <Input m={2} type="text" placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
//     <Input m={2} type="password" placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
// <Button onClick={handleLogin} color={"white"} bg={"blue"} ml={"40%"} mt={2}

// >Login</Button>
// <Text textAlign="center" mt={2}>
//                         Don't have an account? <Button variant="link"  
//                         color={"blue.700"}
//                        colorScheme="blue" onClick={() => navigate("/register")}>Register</Button>
//                     </Text>
//    </Box>

<Box minH="100vh" display="flex" alignItems="center" justifyContent="center" bgGradient="linear(to-r, teal.400, blue.500)">
<Box bg="white" p={8} borderRadius="md" boxShadow="lg" maxW="400px" width="full">
    <VStack spacing={4} align="stretch">
      
        <MotionText 
            size="lg" 
            textAlign="center" 
            color="blue.800" 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 5 }}
        >
            Login
        </MotionText>
        <Input type="text" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button onClick={handleLogin} colorScheme="teal" width="full" mt={4}>Login</Button>
        <Text textAlign="center" mt={2}>
            Don't have an account? <Button variant="link" color="blue.700" colorScheme="blue" onClick={() => navigate("/register")}>Register</Button>
        </Text>
    </VStack>
</Box>
</Box>
  )
}

export default Login
