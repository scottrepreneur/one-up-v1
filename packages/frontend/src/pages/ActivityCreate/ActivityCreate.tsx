import React from 'react';
import {
  Box, Heading,
} from '@chakra-ui/react';
import ActivityForm from '../../forms/ActivityForm';
import { useUser } from '../../contexts/UserContext';

const ActivityCreate: React.FC = () => {
  const { activities, createActivity } = useUser();

  return (
    <Box w='70%' m='0 auto'>
      <Heading size='md' fontWeight={700} textAlign='center' mt={25} color='white' mb={6}>Create a New Activity</Heading>
      <ActivityForm activities={activities} createActivity={createActivity} />
    </Box>
  );
};

export default ActivityCreate;
