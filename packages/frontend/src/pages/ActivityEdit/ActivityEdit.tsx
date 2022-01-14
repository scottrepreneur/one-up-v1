import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { useParams } from 'react-router';
import ActivityForm from 'forms/ActivityForm';
import { useUser } from 'contexts/UserContext';

const ActivityEdit: React.FC = () => {
  const { activities, updateActivity } = useUser();
  const { activity } = useParams<{ activity: any }>();

  return (
    <Box w={{ md: '70%' }} m='0 auto'>
      <Heading size='md' textAlign='center' mt={25} mb={6}>
        {`Update ${activity}`}
      </Heading>
      <ActivityForm
        activity={activity}
        activities={activities}
        updateActivity={updateActivity}
      />
    </Box>
  );
};
export default ActivityEdit;
