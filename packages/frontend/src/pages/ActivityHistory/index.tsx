import React, { FunctionComponent } from 'react';
import { Box, Text, Flex } from '@chakra-ui/core';

import { useActivityHistory } from '../../contexts/Application';
import { ExtendedActivityHistoryRecord } from '../../utils';

const ActivityHistory: FunctionComponent = () => {
  const activityHistory = useActivityHistory();
  console.log(activityHistory);
  const sortedHistory = activityHistory?.sort(
    (a: ExtendedActivityHistoryRecord, b: ExtendedActivityHistoryRecord) =>
      b.timestamp - a.timestamp
  );

  return (
    <Box w='70%' m='0 auto'>
      <Text fontSize='2rem' fontWeight={700} textAlign='center' mt={25} color='white'>Activity History</Text>
      <Box mt={20}>
        <Flex w='90%' h='45px' m='0 auto' justify='space-around'>
          <Box color='white'>Activity</Box>
          <Box color='white'>Points</Box>
          <Box color='white'>Date</Box>
        </Flex>
        {sortedHistory &&
          sortedHistory.map((h: ExtendedActivityHistoryRecord) => {
            return (
              <Flex key={h.timestamp} w='90%' h='45px' m='0 auto' justify='space-around'>
                <Box color='white'>{h.name}</Box>
                <Box color='white'>{h.points}</Box>
                <Box color='white'>{h.timestamp}</Box>
              </Flex>
            );
          })}
      </Box>
    </Box>
  );
};

export default ActivityHistory;
