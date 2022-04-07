import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import * as Yup from "yup";
import { AuthenticationService } from '../api/auth/authService';

export default function RegisterClient() {
  const [showPassword, setShowPassword] = useState(false);  
  const toast = useToast()
  const [client, setClient] = useState({
    username: '',
    email: '',
    password: ''
  })
  const validationSchema = Yup.object({
    username: Yup.string().required(),
    email: Yup.string().required(),
    password: Yup.string().required(),
  });
  const [errors, setErrors] = useState({
    username: false,
    email: false,
    password: false
  })

  // Handles client state changing by input
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>, prop: String) => {
    const clientChanged = {...client};
    //@ts-ignore
    clientChanged[prop] = e.target.value;
    setClient(clientChanged)
    validateClientForm(clientChanged)
  }
  
  // Handles input field errors
  const validateClientForm = (client: any) => {
    !client.username ? errors.username = true : errors.username = false 
    !client.email ? errors.email = true : errors.email = false 
    !client.password ? errors.password = true : errors.password = false 
  }

  // Pop up toast
  const responseToast = (message: String, status: any) => {
    toast({
      title: message,
      status: status,
      position: 'bottom',
      isClosable: true,
    })
  }

  // Handles registration of clients
  const handleRegister = () => {
    validationSchema.isValid(client)
      .then(function (valid) {
        valid ? AuthenticationService.registerClient(client, responseToast) : responseToast('Please fill out remaning fields', 'warning')
      })
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="username" isInvalid={errors.username}>
              <FormLabel>Username</FormLabel>
              <Input type="text" onChange={(event: React.ChangeEvent<HTMLInputElement>) => inputHandler(event, 'username')}/>
            </FormControl>
            <FormControl id="email" isInvalid={errors.email}>
              <FormLabel>Email address</FormLabel>
              <Input type="email" onChange={(event: React.ChangeEvent<HTMLInputElement>) => inputHandler(event, 'email')}/>
            </FormControl>
            <FormControl id="password" isInvalid={errors.password}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} onChange={(event: React.ChangeEvent<HTMLInputElement>) => inputHandler(event, 'password')}/>
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
            <Button
              loadingText="Submitting"
              size="lg"
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}
              onClick={() => handleRegister()}
              >
              Sign up
            </Button>
          </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link color={'blue.400'} href="/login">Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}