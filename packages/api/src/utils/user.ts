import {
  parseISO,
  isAfter,
  sub,
  isBefore,
} from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';

import { DAY_START, TIMEZONE } from '../constants';
import {
  ActivityRecord,
  ActivityHistoryRecord,
  GoalRecord,
} from './definitions';

const isDuringDay = (
  value: any,
  timeStart: any,
  timeEnd: any,
) => {
  // console.log(value);
  return isAfter(value, timeStart) && isBefore(value, timeEnd);
};

export const getStreak = (
  activities: ActivityRecord[],
  activityHistory: ActivityHistoryRecord[],
  goalHistory: GoalRecord[],
) => {
  let streak = 0;
  let streakBreak = false;
  const { goal } = goalHistory[0];
  // const goal = 3;
  // console.log(goal);
  // console.log(activityHistory);

  // set time cut off
  const today = parseISO(new Date().toISOString());

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

  do {
    // get last 0200 timestamp
    // filter activities since timestamp
    let activitiesForDay = [];

    if (streak === 0) {
      activitiesForDay = activityHistory.filter((e) => {
        return isAfter(parseISO(e.timestamp), timestamp);
      });
    } else {
      const timestampStart = sub(timestamp, { days: streak + 1 });
      const timestampEnd = streak > 1 ? sub(timestamp, { days: streak }) : timestamp;
      activitiesForDay = activityHistory
        .filter((e) => isDuringDay(parseISO(e.timestamp), timestampStart, timestampEnd));
    }

    const pointsForDay = activitiesForDay.map((e) => {
      const {
        points,
      } = activities.filter((a) => a.activity === e.activity)[0];

      return points;
    });

    const sumForDay = pointsForDay.reduce((a, b) => a + b, 0);
    if (sumForDay && sumForDay >= goal) {
      streak += 1;
    } else {
      streakBreak = true;
    }
  } while (streakBreak !== true);

  return streak;
};

export const getGoal = () => {

};
