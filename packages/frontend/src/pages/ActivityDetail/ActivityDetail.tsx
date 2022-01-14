import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { useParams, useHistory } from 'react-router-dom';
import {
  Box,
  Flex,
  Heading,
  Button,
  Stack,
  Spinner,
  HStack,
} from '@chakra-ui/react';
import { useUser } from 'contexts/UserContext';
import { useOverlay } from 'contexts/OverlayContext';

const ActivityDetail: React.FC = () => {
  const { activity } = useParams<{ activity: any }>();
  const history = useHistory();
  const { activities, recordActivity } = useUser();
  const { successToast, errorToast } = useOverlay();
  const [activityData, setActivityData] = useState<any>();

  useEffect(() => {
    if (activities) {
      setActivityData(_.find(activities, ['activity', activity]));
    }
  }, [activities, activity]);
  console.log(activityData);

  const detailFields = [
    [
      { label: 'Name', param: 'name' },
      { label: 'ID', param: 'activity' },
    ],
    [
      { label: 'Type', param: 'type' },
      { label: 'Category', param: 'category' },
    ],
    [
      { label: 'Frequency', param: 'frequency' },
      { label: 'Frequency Period', param: 'frequencyPeriod' },
    ],
    [
      { label: 'Cooldown', param: 'cooldown' },
      { label: 'Points', param: 'points' },
    ],
  ];

  const editActivity = () => {
    history.push(`/activity/${activity}/edit`);
  };

  const submitRecordActivity = async () => {
    const result = await recordActivity(activity);
    if (!result.error) {
      successToast({
        title: 'Recorded Activity',
      });
      history.push('/activity/history');
    } else {
      errorToast({
        title: 'Error',
      });
    }
  };

  return (
    <Flex
      align='center'
      direction='column'
      m={{ sm: '30px auto' }}
      w={{ base: '90%', sm: '40%' }}
    >
      <Heading size='xl' mb={6}>
        Activity Detail
      </Heading>
      {activityData ? (
        <>
          <Stack spacing={3} w='100%'>
            {detailFields.map((row) => (
              <Flex justify='space-around' key={_.get(_.first(row), 'label')}>
                {row.map((field) => (
                  <Stack spacing={3} w='40%' key={_.get(field, 'label')}>
                    <Heading size='sm'>{_.get(field, 'label')}</Heading>
                    <Box>{_.get(activityData, _.get(field, 'param'))}</Box>
                  </Stack>
                ))}
              </Flex>
            ))}
          </Stack>
          <Flex w='100%' justify='flex-end' my={5}>
            <HStack spacing={4}>
              <Button variant='outline' onClick={editActivity}>
                Edit
              </Button>
              <Button variant='primary' onClick={submitRecordActivity}>
                Record Now
              </Button>
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
