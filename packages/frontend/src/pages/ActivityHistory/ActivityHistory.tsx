import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { Box, Heading, Flex, Spinner } from '@chakra-ui/react';
import { parseISO, formatDistanceToNow } from 'date-fns';
import { IExtendedActivityHistory } from '@one-up/common';
import { useUser } from 'contexts/UserContext';

const ActivityHistory: React.FC = () => {
  const { activityHistory } = useUser();
  const [sortedHistory, setSortedHistory] = useState<
    Array<IExtendedActivityHistory>
  >([]);

  useEffect(() => {
    if (activityHistory) {
      const tempHistory = _.orderBy(
        activityHistory,
        (a: IExtendedActivityHistory) => parseISO(_.get(a, 'timestamp')),
        'desc',
      );
      setSortedHistory(tempHistory);
    }
  }, [activityHistory]);

  return (
    <Flex
      w={{ base: '90%', sm: '70%' }}
      m='0 auto'
      direction='column'
      align='center'
      justify='center'
    >
      <Heading size='xl'>Activity History</Heading>
      {_.isEmpty(sortedHistory) ? (
        <Flex w='100%' h='250px' align='center' justify='center'>
          <Spinner size='xl' />
        </Flex>
      ) : (
        <Box mt={{ base: 10, sm: 20 }} w='100%'>
          <Flex
            w={{ base: '100%', sm: '90%' }}
            h='45px'
            m='0 auto'
            justify='space-between'
          >
            <Box w={{ base: '35%', sm: '30%' }} textAlign='center'>
              Activity
            </Box>
            <Box w={{ base: '20%', sm: '30%' }} textAlign='center'>
              Points
            </Box>
            <Box w={{ base: '35%', sm: '30%' }} textAlign='center'>
              Date
            </Box>
          </Flex>
          {_.map(sortedHistory, (h: IExtendedActivityHistory) => (
            <Flex
              key={_.get(h, 'timestamp')}
              w={{ sm: '90%' }}
              h='45px'
              m='0 auto'
              justify='space-between'
            >
              <Box
                color='white'
                w={{ base: '35%', sm: '30%' }}
                textAlign='center'
              >
                {_.get(h, 'name')}
              </Box>
              <Box
                color='white'
                w={{ base: '20%', sm: '30%' }}
                textAlign='center'
              >
                {_.get(h, 'points')}
              </Box>
              <Box
                color='white'
                w={{ base: '35%', sm: '30%' }}
                textAlign='center'
              >
                {`${formatDistanceToNow(parseISO(_.get(h, 'timestamp')))} ago`}
              </Box>
            </Flex>
          ))}
        </Box>
      )}
    </Flex>
  );
};

export default ActivityHistory;
