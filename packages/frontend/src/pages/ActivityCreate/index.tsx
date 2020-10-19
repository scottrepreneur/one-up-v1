import React from 'react';
import { useUserDbData } from '../../contexts/Application';

function ActivityCreate() {
  const dbData = useUserDbData();
  const activities = dbData?.activities && JSON.parse(dbData?.activities);
  console.log(activities);

  return (
    <div className='App'>
      <header className='App-header'>Create Activity</header>
    </div>
  );
}

export default ActivityCreate;
