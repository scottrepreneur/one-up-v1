import { parseISO, isAfter, sub } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';

import { DAY_START, TIMEZONE } from './constants';
import { ActivityHistoryRecord, ActivityRecord } from './definitions';

export const getScore = (
  activities: ActivityRecord[],
  activityHistory: ActivityHistoryRecord[],
  timeSince?: number,
) => {
  let timeSinceActivities = [];

  if (timeSince) {
    timeSinceActivities = activityHistory.filter((e) =>
      isAfter(parseISO(e.timestamp), sub(Date.now(), { minutes: timeSince })),
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
    timeSinceActivities = activityHistory.filter((e) =>
      isAfter(parseISO(e.timestamp), timestamp),
    );
  }

  const activitiesWithPoints = timeSinceActivities.map(
    (item: ActivityHistoryRecord) =>
      activities.filter((a) => a.activity === item.activity)[0].points,
  );

  return activitiesWithPoints.reduce((a, b) => a + b, 0);
};

export const test = () => 0;
