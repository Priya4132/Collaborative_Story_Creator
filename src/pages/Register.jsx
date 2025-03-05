import { register } from '@/redux/actions/authActions';
import { Box ,Button,Input,Text} from '@chakra-ui/react'
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
   <Box width={"50%"} m={"10px auto"}>
    <Text textAlign={"center"}>Register</Text>
    <Input type="text" placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
    <Input type="password" placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
<Button onClick={handleRegister} color={"white"} bg={"blue"} m={2} 

>Register</Button>
   </Box>
  )
}

export default Register
