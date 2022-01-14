/* eslint-disable import/prefer-default-export */
import { zonedTimeToUtc } from 'date-fns-tz';
import _ from 'lodash';

import { DAY_START, TIMEZONE } from './constants';

const getUtcStartForDate = (today: Date, date: number) => {
  return zonedTimeToUtc(
    // TODO handle custom day start
    new Date(today.getFullYear(), today.getMonth(), date, DAY_START, 0, 0),
    // TODO handle custom timezone
    TIMEZONE,
  ).toISOString();
};

export const handleTimestamp = (): string => {
  const today = new Date();
  // set for central standard time
  if (_.lt(today.getHours(), 6)) {
    return getUtcStartForDate(today, today.getDate() - 1);
  }
  return getUtcStartForDate(today, today.getDate());
};
