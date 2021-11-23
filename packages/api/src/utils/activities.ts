import {
  parseISO, isAfter, formatDistanceToNow,
} from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';

import { DAY_START, TIMEZONE } from '../constants';
import { ActivityHistoryRecord, ActivityRecord } from './definitions';

export const getActivities = (
  activities: ActivityRecord[],
  activityHistory: ActivityHistoryRecord[],
  timeSince?: number,
) => {
  let timeSinceActivities = [];

  if (timeSince) {
    timeSinceActivities = activityHistory
      .filter((e) => isAfter(parseISO(e.timestamp), Date.now() - timeSince));
  } else {
    const today = new Date();
    let timestamp: any = null;
    if (today.getHours() < 7) {
      timestamp = zonedTimeToUtc(
        new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1, DAY_START, 0, 0),
        TIMEZONE,
      );
    } else {
      timestamp = zonedTimeToUtc(
        new Date(today.getFullYear(), today.getMonth(), today.getDate(), DAY_START, 0, 0),
        TIMEZONE,
      );
    }
    timeSinceActivities = activityHistory
      .filter((e) => isAfter(parseISO(e.timestamp), timestamp));
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
      .filter((e) => isAfter(parseISO(e.timestamp), Date.now() - timeSince));
  } else {
    const today = parseISO(new Date().toISOString());
    let timestamp: any = null;
    // if past 00 UTC (for central time)
    if (today.getHours() < 7) {
      timestamp = zonedTimeToUtc(
        new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1, DAY_START, 0, 0),
        TIMEZONE,
      );
    } else {
      timestamp = zonedTimeToUtc(
        new Date(today.getFullYear(), today.getMonth(), today.getDate(), DAY_START, 0, 0),
        TIMEZONE,
      );
    }
    timeSinceActivities = activityHistory
      .filter((e) => isAfter(parseISO(e.timestamp), timestamp));
  }

  let activitiesTextString = '';

  timeSinceActivities.forEach((item: ActivityHistoryRecord) => {
    const activity = activities.find((a) => a.activity === item.activity);
    if (!activity) return activitiesTextString;

    const { points, name } = activity;

    activitiesTextString = `${name} | ${points} points | ${formatDistanceToNow(parseISO(item.timestamp))} ago\n`.concat(activitiesTextString);
  });

  return activitiesTextString;
};

export const getLastActivity = (
  activities: ActivityRecord[],
  activityHistory: ActivityHistoryRecord[],
) => {
  const test = activityHistory.sort((a, b) => (
    isAfter(parseISO(b.timestamp), parseISO(a.timestamp)) ? 1 : -1
  ));
  const last: any = test[0];
  const lastActivity = activities.find((activity) => activity.activity === last.activity);
  return {
    name: lastActivity?.name,
    points: lastActivity?.points,
    icon: lastActivity?.icon,
    timestamp: last.timestamp,
  };
};
