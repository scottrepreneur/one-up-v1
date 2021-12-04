import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { useParams } from 'react-router';
import ActivityForm from 'forms/ActivityForm';
import { useUser } from 'contexts/UserContext';

const ActivityEdit: React.FC = () => {
  const { activities, updateActivity } = useUser();
  const { activity } = useParams<{ activity: any }>();

  return (
    <Box w='70%' m='0 auto'>
      <Heading
        size='md'
        fontWeight={700}
        textAlign='center'
        mt={25}
        color='white'
        mb={6}
        textTransform='capitalize'
      >
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
