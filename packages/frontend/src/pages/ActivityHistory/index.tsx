import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import { useActivityHistory } from '../../contexts/Application';
import Row from '../../components/Row';
import Column from '../../components/Column';
import { ExtendedActivityHistoryRecord } from '../../utils';

const Wrapper = styled.div`
  width: 70%;
  margin: 0 auto;
`;

const Heading = styled.div`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-top: 25px;
`;

const ActivityList = styled.div`
  margin-top: 20px;
`;

const Activity = styled(Row)`
  width: 90%;
  height: 45px;
  margin: 0 auto;
  justify-content: space-around;
`;

const ActivityHistory: FunctionComponent = () => {
  const activityHistory = useActivityHistory();
  console.log(activityHistory);
  const sortedHistory = activityHistory?.sort(
    (a: ExtendedActivityHistoryRecord, b: ExtendedActivityHistoryRecord) =>
      b.timestamp - a.timestamp
  );

  return (
    <Wrapper>
      <Heading>Activity History</Heading>
      <ActivityList>
        <Activity>
          <Column>Activity</Column>
          <Column>Points</Column>
          <Column>Date</Column>
        </Activity>
        {sortedHistory &&
          sortedHistory.map((h: ExtendedActivityHistoryRecord) => {
            return (
              <Activity key={h.timestamp}>
                <Column>{h.name}</Column>
                <Column>{h.points}</Column>
                <Column>{h.timestamp}</Column>
              </Activity>
            );
          })}
      </ActivityList>
    </Wrapper>
  );
};

export default ActivityHistory;
