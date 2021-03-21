import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box, Flex, Heading, Button, Stack, Spinner, HStack,
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

  const detailFields = [
    [{ label: 'Name', param: 'name' }, { label: 'ID', param: 'activity' }],
    [{ label: 'Type', param: 'type' }, { label: 'Category', param: 'category' }],
    [{ label: 'Frequency', param: 'frequency' }, { label: 'Frequency Period', param: 'frequencyPeriod' }],
    [{ label: 'Cooldown', param: 'cooldown' }, { label: 'Points', param: 'points' }],
  ];

  return (
    <Flex align='center' direction='column' m='30px auto' w='40%'>
      <Heading size='md' mb={6}>Activity Detail</Heading>
      {activityData ? (
        <>
          <Stack spacing={3} w='100%'>
            {detailFields.map((row) => (
              <Flex justify='space-around' key={row[0].label}>
                {row.map((field) => (
                  <Stack spacing={3} w='40%' key={field.label}>
                    <Heading size='sm'>{field.label}</Heading>
                    <Box>{activityData?.[field.param]}</Box>
                  </Stack>
                ))}
              </Flex>
            ))}
          </Stack>
          <Flex w='100%' justify='flex-end'>
            <HStack spacing={4}>
              <Button variant='outline'>Edit</Button>
              <Button variant='primary'>Record Now</Button>
            </HStack>
          </Flex>
        </>
      ) : (
        <Flex h='300px' w='100%' align='center' justify='center'>
          <Spinner size='xl' />
        </Flex>
      )}
    </Flex>
  );
};

export default ActivityDetail;
