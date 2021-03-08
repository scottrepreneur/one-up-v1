import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box, Flex, Heading, Input,
} from '@chakra-ui/react';
import { useUser } from '../../contexts/UserContext';

const ActivityDetail: React.FC = () => {
  const { activity } = useParams();
  const { activities } = useUser();
  const [activityData, setActivityData] = useState<any>();

  useEffect(() => {
    if (activities) {
      setActivityData(activities.filter((a: any) => a.activity === activity)[0]);
    }
  }, [activities, activity]);
  console.log(activityData);

  return (
    <Flex align='center' direction='column'>
      <Heading size='md'>Activity Detail</Heading>
      {activityData && (
        <>
          <Box>Name:</Box>
          <Input value={activityData?.name} />
        </>
      )}

    </Flex>
  );
};

export default ActivityDetail;
