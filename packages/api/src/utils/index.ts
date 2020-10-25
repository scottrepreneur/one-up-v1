import { ActivityHistoryRecord, ActivityRecord } from './definitions';

export { default as runWarm } from './run-warm';
export * from './lambda-response';
export * from './dynamodb-queries';
export * from './definitions';

export * from './activities';

export const getScore = (
  activities: ActivityRecord[],
  activityHistory: ActivityHistoryRecord[],
  timeSince: number,
) => {
  const timeNow: any = Date.now();
  console.log(timeNow);
  const timeSinceActivities = activityHistory.filter((e) => {
    console.log(timeSince * 1000, timeNow - e.timestamp);
    return timeNow - e.timestamp < timeSince * 1000;
  });
  console.log(timeSinceActivities);
  const activitiesWithPoints = timeSinceActivities.map((item: ActivityHistoryRecord) => {
    return activities.filter((a) => a.activity === item.activity)[0].points;
  });

  return activitiesWithPoints.reduce((a, b) => a + b, 0);
};
