import moment from 'moment-timezone';

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
  return value > timeStart && value < timeEnd;
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
  const daySeconds = 24 * 60 * 60 * 1000;
  const today = new Date();
  const timestamp: any = new Date(today.getFullYear(), today.getMonth(), today.getDate(), DAY_START, 0, 0); // .utc().subtract(1, 'day').format('YYYY-MM-DD'); // .tz('America/Chicago');
  // console.log(timestamp);

  do {
    // get last 0200 timestamp
    // filter activities since timestamp
    // console.log('streak', streak);
    let activitiesForDay = [];

    if (streak === 0) {
      activitiesForDay = activityHistory.filter((e) => {
        // console.log(e.timestamp > timestamp);
        return e.timestamp > timestamp;
      });
    } else {
      const timestampStart = new Date(timestamp - ((streak + 1) * daySeconds));
      const timestampEnd = streak > 1 ? new Date(timestamp - ((streak) * daySeconds)) : timestamp;
      // console.log('start', timestampStart.toString());
      // console.log('end', timestampEnd);
      activitiesForDay = activityHistory
        .filter((e) => isDuringDay(e.timestamp, timestampStart, timestampEnd));
    }
    // console.log(activitiesForDay);

    const pointsForDay = activitiesForDay.map((e) => {
      const {
        points,
      } = activities.filter((a) => a.activity === e.activity)[0];

      return points;
    });

    const sumForDay = pointsForDay.reduce((a, b) => a + b, 0);
    // console.log(sumForDay);
    if (sumForDay && sumForDay > goal) {
      streak += 1;
    } else {
      streakBreak = true;
    }
  } while (streakBreak !== true);
  // activityHistory.forEach(history => {

  // });
  return streak;
};

export const getGoal = () => {

};
