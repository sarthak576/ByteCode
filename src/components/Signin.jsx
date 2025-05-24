import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from "jwt-decode"
import { 
  Box, 
  VStack, 
  Heading, 
  Input, 
  InputGroup, 
  InputRightElement, 
  Button, 
  Text, 
  Divider, 
  Flex, 
  useColorModeValue 
} from '@chakra-ui/react';
import { FaEye, FaEyeSlash, FaGithub, FaGoogle } from 'react-icons/fa';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const cardBg = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const inputBg = useColorModeValue('gray.50', 'gray.600');

  return (
    <>
    <GoogleLogin 
    onSuccess={(credentialResponse)=>{console.log(credentialResponse)
      console.log(credentialResponse)
    }} 
    onError={()=>console.log("Login Failed")}
    />
    </>
  )
};

export default SignIn;