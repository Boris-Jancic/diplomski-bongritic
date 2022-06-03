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
  Textarea,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { AuthenticationService } from '../api/auth/authService';
import { useRecoilValue } from 'recoil';
import { authAtom } from '../state/auth';
import * as Yup from "yup";

export default function RegisterClient() {
  const isLogged = useRecoilValue(authAtom);
  const [showPassword, setShowPassword] = useState(false);  
  const toast = useToast()
  const [reviewer, setReviewer] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    jmbg: '',
    biography: '',
    avatar: '',
  })
  
  const validationSchema = Yup.object({
    username: Yup.string().required(),
    email: Yup.string().required(),
    password: Yup.string().required(),
  });
  const [errors, setErrors] = useState({
    username: false,
    email: false,
    password: false,
    firstName: false,
    lastName: false,
    jmbg: false,
    biography: false,
    avatar: false,
  })
  
  useEffect(() => {
    if (isLogged) window.location.assign("/") 
  }, [isLogged])

  // Handles client state changing by input
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>, prop: String) => {
    const clientChanged = {...reviewer};
    //@ts-ignore
    clientChanged[prop] = e.target.value;
    setReviewer(clientChanged)
    validateClientForm(clientChanged)
  }
  
  // Handles input field errors
  const validateClientForm = (client: any) => {
    !client.username ? errors.username = true : errors.username = false 
    !client.email ? errors.email = true : errors.email = false 
    !client.password ? errors.password = true : errors.password = false 
    !client.firstName ? errors.firstName = true : errors.firstName = false 
    !client.lastName ? errors.lastName = true : errors.lastName = false 
    !client.jmbg ? errors.jmbg = true : errors.jmbg = false 
    !client.biography ? errors.biography = true : errors.biography = false 
    !client.avatar ? errors.avatar = true : errors.avatar = false 
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
    validationSchema.isValid(reviewer)
      .then(function (valid) {
        valid ? AuthenticationService.registerReviewer(reviewer, responseToast) : responseToast('Please fill out remaning fields', 'warning')
      })
  }
  
  // Handles file change
  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e?.target?.files;
    if (files) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setReviewer({ ...reviewer, avatar: reader.result?.toString() ?? "" });
      });
      reader.readAsDataURL(files[0]);
    }
  };


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
            <FormControl id="firstName" isInvalid={errors.firstName}>
              <FormLabel>First name</FormLabel>
              <Input type="text" onChange={(event: React.ChangeEvent<HTMLInputElement>) => inputHandler(event, 'firstName')}/>
            </FormControl>
            <FormControl id="lastName" isInvalid={errors.lastName}>
              <FormLabel>Last name</FormLabel>
              <Input type="text" onChange={(event: React.ChangeEvent<HTMLInputElement>) => inputHandler(event, 'lastName')}/>
            </FormControl>
            <FormControl id="username" isInvalid={errors.username}>
              <FormLabel>Username</FormLabel>
              <Input type="text" onChange={(event: React.ChangeEvent<HTMLInputElement>) => inputHandler(event, 'username')}/>
            </FormControl>
            <FormControl id="jmbg" isInvalid={errors.username}>
              <FormLabel>JMBG</FormLabel>
              <Input maxLength={13} type="text" onChange={(event: React.ChangeEvent<HTMLInputElement>) => inputHandler(event, 'jmbg')}/>
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
            <FormControl id="biography" isInvalid={errors.biography}>
              <FormLabel>Short biography</FormLabel>
              <Textarea
                  id='biography' 
                  //@ts-ignore
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => inputHandler(event, 'biography')} />
            </FormControl>
            <FormControl id="avatar" isInvalid={errors.avatar}>
              <FormLabel>Avatar</FormLabel>
              <Input 
                type="file"
                accept=".jpeg, .png, .jpg"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChangeFile(event)}/>
            </FormControl>
            <Stack spacing={10} pt={2}>
            <Button
              loadingText="Submitting"
              size="lg"
              bg={'green.400'}
              color={'white'}
              _hover={{
                bg: 'green.500',
              }}
              onClick={() => handleRegister()}
              >
              Sign up
            </Button>
          </Stack>
          
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link color={'green.400'} href="/login">Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}