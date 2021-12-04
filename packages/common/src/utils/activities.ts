import { parseISO, isAfter, formatDistanceToNow } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import _ from 'lodash';

import { DAY_START, TIMEZONE } from './constants';
import { ActivityHistoryRecord, ActivityRecord } from './definitions';

export const getActivities = (
  activities: ActivityRecord[],
  activityHistory: ActivityHistoryRecord[],
  timeSince?: number,
) => {
  let timeSinceActivities = [];

  if (timeSince) {
    timeSinceActivities = _.filter(activityHistory, (e) =>
      isAfter(parseISO(e.timestamp), Date.now() - timeSince),
    );
  } else {
    const today = new Date();
    let timestamp: any = null;
    if (today.getHours() < 7) {
      timestamp = zonedTimeToUtc(
        new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - 1,
          DAY_START,
          0,
          0,
        ),
        TIMEZONE,
      );
    } else {
      timestamp = zonedTimeToUtc(
        new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          DAY_START,
          0,
          0,
        ),
        TIMEZONE,
      );
    }
    timeSinceActivities = _.filter(activityHistory, (e) =>
      isAfter(parseISO(e.timestamp), timestamp),
    );
  }
  const activitiesWithPoints = _.map(
    timeSinceActivities,
    (item: ActivityHistoryRecord) => {
      const { points, name, category, icon, type } = _.filter(
        activities,
        (a) => a.activity === item.activity,
      )[0];

      return {
        ...item,
        points,
        name,
        category,
        icon,
        type,
      };
    },
  );

  return activitiesWithPoints;
};

export const getActivitiesText = (
  activities: ActivityRecord[],
  activityHistory: ActivityHistoryRecord[],
  timeSince?: number,
) => {
  let timeSinceActivities = [];

  if (timeSince) {
    timeSinceActivities = _.filter(activityHistory, (e) =>
      isAfter(parseISO(e.timestamp), Date.now() - timeSince),
    );
  } else {
    const today = parseISO(new Date().toISOString());
    let timestamp: any = null;
    // if past 00 UTC (for central time)
    if (today.getHours() < 7) {
      timestamp = zonedTimeToUtc(
        new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - 1,
          DAY_START,
          0,
          0,
        ),
        TIMEZONE,
      );
    } else {
      timestamp = zonedTimeToUtc(
        new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          DAY_START,
          0,
          0,
        ),
        TIMEZONE,
      );
    }
    timeSinceActivities = _.filter(activityHistory, (e) =>
      isAfter(parseISO(e.timestamp), timestamp),
    );
  }

  let activitiesTextString = '';

  _.forEach(timeSinceActivities, (item: ActivityHistoryRecord) => {
    const activity = activities.find((a) => a.activity === item.activity);
    if (!activity) return activitiesTextString;

    const { points, name } = activity;

    activitiesTextString = `${name} | ${points} points | ${formatDistanceToNow(
      parseISO(item.timestamp),
    )} ago\n`.concat(activitiesTextString);
    return '';
  });

  return activitiesTextString;
};

export const getLastActivity = (
  activities: ActivityRecord[],
  activityHistory: ActivityHistoryRecord[],
) => {
  const test = _.sortBy(activityHistory, (a) => parseISO(a.timestamp));
  const last: any = test[0];
  const lastActivity = _.find(
    activities,
    (activity) => activity.activity === last.activity,
  );
  return {
    name: lastActivity?.name,
    points: lastActivity?.points,
    icon: lastActivity?.icon,
    timestamp: last.timestamp,
  };
};

export const getPointsToday = () => {
  // const cutOffTime =
  // const timestamp = new Date();
  // return history.filter(activity => activity.)
};

export const getPointsThisWeek = (history: any) => {
  console.log(history);
};
