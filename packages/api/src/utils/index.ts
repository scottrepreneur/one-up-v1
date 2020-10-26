import moment from 'moment-timezone';

import { DAY_START } from '../constants';
import { ActivityHistoryRecord, ActivityRecord } from './definitions';

export { default as runWarm } from './run-warm';
export * from './lambda-response';
export * from './dynamodb-queries';
export * from './definitions';

export * from './activities';
export * from './user';

export const getScore = (
  activities: ActivityRecord[],
  activityHistory: ActivityHistoryRecord[],
  timeSince?: number,
) => {
  let timeSinceActivities = [];

  if (timeSince) {
    timeSinceActivities = activityHistory
      .filter((e) => e.timestamp > Date.now() - timeSince);
  } else {
    const today = new Date();
    const timestamp: any = new Date(today.getFullYear(), today.getMonth(), today.getDate(), DAY_START, 0, 0);
    timeSinceActivities = activityHistory
      .filter((e) => e.timestamp > timestamp);
  }

  const activitiesWithPoints = timeSinceActivities
    .map((item: ActivityHistoryRecord) => activities
      .filter((a) => a.activity === item.activity)[0].points);

  return activitiesWithPoints.reduce((a, b) => a + b, 0);
};
