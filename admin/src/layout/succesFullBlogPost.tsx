import { Box, Heading, Text } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';

export default function SuccessfullPost() {
  return (
    <Box textAlign="center" py={10} px={6}>
      <CheckCircleIcon boxSize={'50px'} color={'green.500'} />
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Success
      </Heading>
      <Text color={'gray.500'}>
        Your post has been succesfully submited, it will be reviewed by the administrator shortly.
      </Text>
    </Box>
  );
}