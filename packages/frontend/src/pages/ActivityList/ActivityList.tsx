import React, { FunctionComponent } from 'react';
import { Box, Heading, Flex, useTheme, Spinner } from '@chakra-ui/react';
import { useHistory } from 'react-router';

import { useUser } from '../../contexts/UserContext';
import { ActivityRecord } from '../../utils';

const ActivityList: FunctionComponent = () => {
  const { loading, activities } = useUser();
  const history = useHistory();
  const theme = useTheme();
  console.log(activities);
  const handleClick = (activity: string) => {
    history.push(`/activity/${activity}`);
  };

  return (
    <Flex w='70%' m='0 auto' direction='column' align='center'>
      <Heading size='xl'>Activities</Heading>
      <Box pt={20} w='100%'>
        {activities && activities.length ? (
          activities.map((activity: ActivityRecord) => (
            <Flex
              key={activity.activity}
              _hover={{
                cursor: 'pointer',
                backgroundColor: theme.colors.blue[500],
              }}
              py={3}
              onClick={() => handleClick(activity.activity)}
            >
              <Flex w='50%' direction='column' align='center' color='white'>
                {activity.name}
              </Flex>
              <Flex w='50%' direction='column' align='center' color='white'>
                {`${activity.points} points`}
              </Flex>
            </Flex>
          ))
        ) : activities.length === 0 && !loading ? (
          <Flex justify='center' color='white'>
            No Activities Found. Create One!
          </Flex>
        ) : (
          <Flex w='100%' h='250px' align='center' justify='center'>
            <Spinner size='xl' />
          </Flex>
        )}
      </Box>
    </Flex>
  );
};

export default ActivityList;
