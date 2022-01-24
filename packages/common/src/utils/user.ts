/* eslint-disable import/prefer-default-export */
import { parseISO, isAfter, sub, isBefore } from 'date-fns';
import _ from 'lodash';

import { IActivity, IActivityHistory, IGoal } from './definitions';
import { handleTimestamp } from './general';
import { activitiesSince } from './activities';
import { pointsForTimePeriod } from './score';

const isDuringDay = (value: any, timeStart: any, timeEnd: any) => {
  return isAfter(value, timeStart) && isBefore(value, timeEnd);
};

export const getStreak = (
  activities: IActivity[],
  activityHistory: IActivityHistory[],
  goalHistory: IGoal[],
) => {
  let streak = 0;
  let streakBreak = false;
  const goal = _.first(goalHistory);
  // set time cut off

  do {
    // get last 0200 timestamp
    // filter activities since timestamp
    let activitiesForDay = [];

    if (_.isEqual(streak, 0)) {
      activitiesForDay = activitiesSince(activityHistory, handleTimestamp());
    } else {
      const timestampStart = sub(parseISO(handleTimestamp()), {
        days: streak + 1,
      });
      const timestampEnd = _.gt(streak, 1)
        ? sub(parseISO(handleTimestamp()), { days: streak })
        : parseISO(handleTimestamp());
      activitiesForDay = _.filter(activityHistory, (e) =>
        isDuringDay(parseISO(e.timestamp), timestampStart, timestampEnd),
      );
    }

    if (
      _.gte(
        pointsForTimePeriod(activities, activitiesForDay),
        _.get(goal, 'goal'),
      )
    ) {
      streak = _.add(streak, 1);
    } else {
      streakBreak = true;
    }
  } while (streakBreak !== true);

  return streak;
};
