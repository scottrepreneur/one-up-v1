import React, { useState, useEffect } from 'react';
import { Box, Text, Flex } from '@chakra-ui/react';
import { parseISO, formatDistanceToNow } from 'date-fns';

import { useUser } from '../../contexts/UserContext';
import { ExtendedActivityHistoryRecord } from '../../utils';

const ActivityHistory: React.FC = () => {
  const { activityHistory } = useUser();
  const [sortedHistory, setSortedHistory] = useState([]);
  console.log(activityHistory);

  useEffect(() => {
    if (activityHistory) {
      const tempHistory = activityHistory?.sort(
        (a: ExtendedActivityHistoryRecord, b: ExtendedActivityHistoryRecord) => (
          parseISO(b.timestamp).getTime() - parseISO(a.timestamp).getTime()
        ),
      );
      setSortedHistory(tempHistory);
    }
  }, [activityHistory]);

  return (
    <Box w='70%' m='0 auto' textAlign='center'>
      <Text fontSize='2rem' fontWeight={700} textAlign='center' mt={25} color='white'>Activity History</Text>
      <Box mt={20}>
        <Flex w='90%' h='45px' m='0 auto' justify='space-between'>
          <Box color='white' w='30%'>Activity</Box>
          <Box color='white' w='30%'>Points</Box>
          <Box color='white' w='40%'>Date</Box>
        </Flex>
        {sortedHistory?.map((h: ExtendedActivityHistoryRecord) => (
          <Flex key={h.timestamp} w='90%' h='45px' m='0 auto' justify='space-between'>
            <Box color='white' w='30%'>{h.name}</Box>
            <Box color='white' w='30%'>{h.points}</Box>
            <Box color='white' w='40%'>{`${formatDistanceToNow(parseISO(h.timestamp))} ago`}</Box>
          </Flex>
        ))}
      </Box>
    </Box>
  );
};

export default ActivityHistory;
