import React, { FunctionComponent } from 'react';
import _ from 'lodash';
import { Box, Heading, Flex, Spinner, Stack, HStack } from '@chakra-ui/react';
import { useUser } from 'contexts/UserContext';

const Dashboard: FunctionComponent = () => {
  const { userData } = useUser();
  console.log(userData);

  return (
    <Box w='70%' m='0 auto'>
      <Heading size='xl' textAlign='center' color='white'>
        Dashboard
      </Heading>
      {userData ? (
        <Stack spacing={6}>
          <Flex justify='space-between' my={100}>
            <Flex as={Stack} direction='column' align='center' spacing={4}>
              <Heading size='md'>Points Today</Heading>
              <Heading size='2xl'>{_.get(userData, 'pointsToday')}</Heading>
            </Flex>
            <Flex as={Stack} direction='column' align='center' spacing={4}>
              <Heading size='md'>Current Goal</Heading>
              <Heading size='2xl'>{_.get(userData, 'currentGoal')}</Heading>
            </Flex>
            <Flex as={Stack} direction='column' align='center' spacing={4}>
              <Heading size='md'>Current Streak</Heading>
              <Heading size='2xl'>{_.get(userData, 'currentStreak')}</Heading>
            </Flex>
          </Flex>
          <Flex as={HStack} spacing={6} justify='center'>
            <Box>
              <Box>Last Activity</Box>
              <Box>{_.get(userData, 'lastActivity.name')}</Box>
            </Box>
          </Flex>
        </Stack>
      ) : (
        <Flex w='100%' h='250px' align='center' justify='center'>
          <Spinner size='xl' />
        </Flex>
      )}
    </Box>
  );
};

export default Dashboard;
