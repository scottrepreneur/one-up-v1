import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import { useUserDbData } from '../../contexts/Application';
// import Row from '../../components/Row';
// import Column from '../../components/Column';
// import { ActivityRecord, ActivityHistoryRecord } from '../../utils';

const Wrapper = styled.div`
  width: 70%;
  margin: 0 auto;
`;

type ActivityHistoryRecordType = {
  activity: string;
  timestamp: number;
  name: string;
  points: number;
};

const ActivityHistory: FunctionComponent = () => {
  const dbData = useUserDbData();
  console.log(dbData);

  return <Wrapper>History</Wrapper>;
};

export default ActivityHistory;
