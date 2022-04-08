import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Image,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { AuthenticationService } from '../api/auth/authService';
import { authAtom } from '../state/auth';
import * as Yup from "yup";


const validationSchema = Yup.object({
  email: Yup.string().required(),
  password: Yup.string().required(),
});

export default function Login() {
  const [ isLogged, setIsLogged ] = useRecoilState(authAtom);
  const [credentials, setCredentials] = useState({
    email: String,
    password: String
  })
  const [errors, setErrors] = useState({
    email: false,
    password: false
  })
  const toast = useToast()

  useEffect(() => {
    if (isLogged) window.location.assign("/") 
  }, [])
   
  // Handles input field errors
  const validateCredentialForm = (credentials: any) => {
    !credentials.email ? errors.email = true : errors.email = false 
    !credentials.password ? errors.password = true : errors.password = false 
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
  
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>, prop: String) => {
    const credentialsChanged = {...credentials};
    //@ts-ignore
    credentialsChanged[prop] = e.target.value;
    setCredentials(credentialsChanged)
    validateCredentialForm(credentialsChanged)
  }
  
  const handleLogin = () => {
    validationSchema.isValid(credentials)
      .then(function (valid) {
        valid ? AuthenticationService.login(credentials, responseToast) : responseToast('Please fill out remaning fields', 'warning')
      })
  }

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'}>Sign in to your account</Heading>
          <FormControl id="email" isInvalid={errors.email}>
            <FormLabel>Email address</FormLabel>
            <Input type="email"  onChange={(event: React.ChangeEvent<HTMLInputElement>) => inputHandler(event, 'email')}/>
          </FormControl>
          <FormControl id="password" isInvalid={errors.password}>
            <FormLabel>Password</FormLabel>
            <Input type="password" onChange={(event: React.ChangeEvent<HTMLInputElement>) => inputHandler(event, 'password')}/>
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}>
              <Link color={'green.300'}>Forgot password?</Link>
            </Stack>
            <Button colorScheme={'green'} variant={'solid'} onClick={() => handleLogin()}>
              Sign in
            </Button>
            <Link color={'green.500'} href="/register">Not registered? Sign up here!</Link>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
          }
        />
      </Flex>
    </Stack>
  );
}
