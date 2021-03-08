import React, { FunctionComponent } from 'react';
import {
  Box, Text, Flex, useTheme,
} from '@chakra-ui/react';

import { useUser } from '../../contexts/UserContext';
import { ActivityRecord } from '../../utils';

const ActivityList: FunctionComponent = () => {
  const { activities } = useUser();
  const theme = useTheme();
  console.log(activities);

  return (
    <Box w='70%' m='0 auto'>
      <Text fontSize='24px' fontWeight={700} textAlign='center' mt={25} color='white'>Activities</Text>
      <Box pt={20}>
        {activities ? (
          activities.map((activity: ActivityRecord) => (
            <Flex key={activity.activity} _hover={{ cursor: 'pointer', backgroundColor: theme.colors.blue[500] }} py={3}>
              <Flex w='50%' direction='column' align='center' color='white'>
                {activity.name}
              </Flex>
              <Flex w='50%' direction='column' align='center' color='white'>
                {`${activity.points} points`}
              </Flex>
            </Flex>
          ))
        ) : (
          <Flex justify='center' color='white'>No Activities Found. Create One!</Flex>
        )}
      </Box>
    </Box>
  );
};

export default ActivityList;
