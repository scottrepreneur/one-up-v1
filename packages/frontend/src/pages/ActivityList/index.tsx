import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import { useUserDbData } from '../../contexts/Application';
import Column, { AutoColumn } from '../../components/Column';
import Row from '../../components/Row';
import { ActivityRecord } from '../../utils';

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

const ActivitiesList = styled(Column)`
  padding-top: 20px;
`;

const Activity = styled(Row)`
  height: 55px;
  width: 100%;

  :hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.lighterBackgroundColor};
  }
`;

const ActivityList: FunctionComponent = () => {
  const dbData = useUserDbData();
  const activities = dbData?.activities && JSON.parse(dbData?.activities);
  console.log(activities);

  return (
    <Wrapper>
      <Heading>Activities</Heading>
      <ActivitiesList>
        {activities ? (
          activities.map((activity: ActivityRecord) => {
            return (
              <Activity key={activity.activity}>
                <AutoColumn style={{ width: '50%' }} justify='center'>
                  {activity.name}
                </AutoColumn>
                <AutoColumn style={{ width: '50%' }} justify='center'>
                  {activity.points} points
                </AutoColumn>
              </Activity>
            );
          })
        ) : (
          <Row justify='center'>No Activities Found. Create One!</Row>
        )}
      </ActivitiesList>
    </Wrapper>
  );
};

export default ActivityList;
