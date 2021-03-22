import React from 'react';
import {
  Flex, Heading,
} from '@chakra-ui/react';
import ActivityForm from '../../forms/ActivityForm';
import { useUser } from '../../contexts/UserContext';

const ActivityCreate: React.FC = () => {
  const { activities, createActivity } = useUser();

  return (
    <Flex w='70%' m='0 auto' direction='column' align='center'>
      <Heading size='xl' fontWeight={700} textAlign='center' mt={25} color='white' mb={6}>Create a New Activity</Heading>
      <ActivityForm activities={activities} createActivity={createActivity} />
    </Flex>
  );
};

export default ActivityCreate;
