import { ActivityHistoryRecord, ActivityRecord } from './definitions';

export const getActivities = (
  activities: ActivityRecord[],
  activityHistory: ActivityHistoryRecord[],
  timeSince: number,
) => {
  const timeNow: any = Date.now();
  const timeSinceActivities = activityHistory
    .filter((e) => timeNow - e.timestamp < timeSince * 1000);
  const activitiesWithPoints = timeSinceActivities.map((item: ActivityHistoryRecord) => {
    const {
      points, name, category, icon, type,
    } = activities.filter((a) => a.activity === item.activity)[0];

    return {
      ...item,
      points,
      name,
      category,
      icon,
      type,
    };
  });

  return activitiesWithPoints;
};

export const getActivitiesText = (
  activities: ActivityRecord[],
  activityHistory: ActivityHistoryRecord[],
  timeSince: number,
) => {
  const timeNow: any = Date.now();
  const timeSinceActivities = activityHistory
    .filter((e) => timeNow - e.timestamp < timeSince * 1000);

  const activitiesWithPoints = timeSinceActivities.map((item: ActivityHistoryRecord) => {
    const {
      points, name, category, icon, type,
    } = activities.filter((a) => a.activity === item.activity)[0];

    return {
      ...item,
      points,
      name,
      category,
      icon,
      type,
    };
  });

  return activitiesWithPoints;
};
