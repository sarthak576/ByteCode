import React, { useState } from 'react';
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
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bgGradient="linear(to-r, gray.800, gray.600)"
      p={4}
    >
      <Box
        bg={cardBg}
        p={8}
        rounded="lg"
        shadow="lg"
        w="full"
        maxW="md"
      >
        <VStack spacing={6}>
          <Heading size="lg" color={textColor} textAlign="center">
            Sign In
          </Heading>

          <VStack spacing={4} w="full">
            <Input
              placeholder="Email or Phone"
              size="lg"
              bg={inputBg}
              borderColor="gray.300"
              focusBorderColor="blue.500"
              _hover={{ borderColor: 'gray.400' }}
            />
            
            <InputGroup size="lg">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                bg={inputBg}
                borderColor="gray.300"
                focusBorderColor="blue.500"
                _hover={{ borderColor: 'gray.400' }}
              />
              <InputRightElement>
                <Button
                  variant="ghost"
                  onClick={togglePasswordVisibility}
                  _hover={{ bg: 'transparent' }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </InputRightElement>
            </InputGroup>

            <Text
              as="a"
              href="#"
              fontSize="sm"
              color="blue.500"
              _hover={{ textDecoration: 'underline' }}
              textAlign="center"
            >
              Forget Password?
            </Text>
          </VStack>

          <VStack spacing={4} w="full">
            <Button
              leftIcon={<FaGithub />}
              bg="gray.800"
              color="white"
              w="full"
              size="lg"
              _hover={{ bg: 'gray.700' }}
            >
              Sign in with GitHub
            </Button>

            <Flex align="center" w="full">
              <Divider borderColor="gray.300" />
              <Text px={4} color="gray.500">
                or
              </Text>
              <Divider borderColor="gray.300" />
            </Flex>

            <Button
              leftIcon={<FaGoogle />}
              bg="gray.100"
              color="gray.800"
              w="full"
              size="lg"
              _hover={{ bg: 'gray.200' }}
            >
              Sign in with Google
            </Button>
          </VStack>
        </VStack>
      </Box>
    </Flex>
  );
};

export default SignIn;