import React, { FunctionComponent } from 'react';
import {
  Grid,
  GridItem,
  Heading,
  Flex,
  useTheme,
  Spinner,
  Stack,
} from '@chakra-ui/react';
import { useHistory } from 'react-router';
import { ActivityRecord } from '@one-up/common';
import { useUser } from 'contexts/UserContext';
import Icon from 'components/Icon';

const ActivityList: FunctionComponent = () => {
  const { loading, activities } = useUser();
  const history = useHistory();
  const theme = useTheme();
  console.log(activities);
  const handleClick = (activity: string) => {
    history.push(`/activity/${activity}`);
  };

  return (
    <Flex
      w={{ sm: '70%' }}
      m={{ sm: '0 auto' }}
      direction='column'
      align='center'
    >
      <Heading size='xl'>Activities</Heading>
      <Grid pt={20} w='100%' templateColumns='repeat(3, 1fr)' gap={4}>
        {activities && activities.length ? (
          activities.map((activity: ActivityRecord) => (
            <GridItem
              key={activity.activity}
              _hover={{
                cursor: 'pointer',
                backgroundColor: theme.colors.blue[500],
              }}
              onClick={() => handleClick(activity.activity)}
              borderRadius={15}
            >
              <Stack align='center' direction='column' spacing={6} py={8}>
                <Icon iconKey={activity.icon} w='40px' h='40px' />
                <Flex textAlign='center' color='white'>
                  {activity.name}
                </Flex>
                <Flex textAlign='center' color='white'>
                  {`${activity.points} points`}
                </Flex>
              </Stack>
            </GridItem>
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
      </Grid>
    </Flex>
  );
};

export default ActivityList;
