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
import { useState } from 'react';
import { AuthenticationService } from '../api/auth/authService';

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: String,
    password: String
  })
  const toast = useToast()

  const handleLogin = () => {
    AuthenticationService.login(credentials, toast)
  }
  
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>, prop: String) => {
      const credentialsChanged = {...credentials};
      //@ts-ignore
      credentialsChanged[prop] = e.target.value;
      setCredentials(credentialsChanged)
  }

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'}>Sign in to your account</Heading>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email"  onChange={(event: React.ChangeEvent<HTMLInputElement>) => inputHandler(event, 'email')}/>
          </FormControl>
          <FormControl id="password">
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
