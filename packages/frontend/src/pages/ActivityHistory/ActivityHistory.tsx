import React, { useState, useEffect } from 'react';
import { Box, Heading, Flex, Spinner } from '@chakra-ui/react';
import { parseISO, formatDistanceToNow } from 'date-fns';
import { ExtendedActivityHistoryRecord } from '@one-up/common';
import { useUser } from 'contexts/UserContext';

const ActivityHistory: React.FC = () => {
  const { activityHistory } = useUser();
  const [sortedHistory, setSortedHistory] = useState([]);
  console.log(activityHistory);

  useEffect(() => {
    if (activityHistory) {
      const tempHistory = activityHistory?.sort(
        (a: ExtendedActivityHistoryRecord, b: ExtendedActivityHistoryRecord) =>
          parseISO(b.timestamp).getTime() - parseISO(a.timestamp).getTime(),
      );
      setSortedHistory(tempHistory);
    }
  }, [activityHistory]);

  return (
    <Flex w='70%' m='0 auto' direction='column' align='center' justify='center'>
      <Heading size='xl' color='white'>
        Activity History
      </Heading>
      {sortedHistory.length ? (
        <Box mt={20} w='100%'>
          <Flex w='90%' h='45px' m='0 auto' justify='space-between'>
            <Box color='white' w='30%' textAlign='center'>
              Activity
            </Box>
            <Box color='white' w='30%' textAlign='center'>
              Points
            </Box>
            <Box color='white' w='30%' textAlign='center'>
              Date
            </Box>
          </Flex>
          {sortedHistory?.map((h: ExtendedActivityHistoryRecord) => (
            <Flex
              key={h.timestamp}
              w='90%'
              h='45px'
              m='0 auto'
              justify='space-between'
            >
              <Box color='white' w='30%' textAlign='center'>
                {h.name}
              </Box>
              <Box color='white' w='30%' textAlign='center'>
                {h.points}
              </Box>
              <Box color='white' w='30%' textAlign='center'>
                {`${formatDistanceToNow(parseISO(h.timestamp))} ago`}
              </Box>
            </Flex>
          ))}
        </Box>
      ) : (
        <Flex w='100%' h='250px' align='center' justify='center'>
          <Spinner size='xl' />
        </Flex>
      )}
    </Flex>
  );
};

export default ActivityHistory;
