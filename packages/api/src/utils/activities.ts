import moment from 'moment-timezone';

import { DAY_START } from '../constants';
import { ActivityHistoryRecord, ActivityRecord } from './definitions';

export const getActivities = (
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

  let activitiesTextString = '';

  timeSinceActivities.forEach((item: ActivityHistoryRecord) => {
    const { points, name } = activities.filter((a) => a.activity === item.activity)[0];

    activitiesTextString += `${name} | Points: ${points} | Last: Today\n`;
  });

  return activitiesTextString;
};
