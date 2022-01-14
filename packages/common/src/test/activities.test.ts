import assert from 'assert';
import _ from 'lodash';
import { add, sub } from 'date-fns';
import activityList from './fixtures/activities';
import activityHistory from './fixtures/activityHistory';
import {
  activitiesSince,
  getActivities,
  getActivitiesText,
  getLastActivity,
} from '../utils/activities';

// const todayUtc = () => _.gt(new Date().getHours(), 6); // TODO handle differnt timezone
const getPastTimestamp = (days: number) =>
  sub(new Date(), { days, hours: 10 }).toISOString();
const getTimestampInFuture = () => {
  return add(new Date(), { days: 5 }).toISOString();
};

describe('Activities Utilities', () => {
  describe('activitiesSince()', () => {
    it('should return 2 activties since 1/1/2022', () => {
      const a = activitiesSince(activityHistory, getPastTimestamp(6));
      assert.equal(_.size(a), 2);
    });

    it('should return 2 activities since 1/10/2022', () => {
      const a = activitiesSince(activityHistory, getPastTimestamp(11));
      assert.equal(_.size(a), 2);
    });

    it('should return 0 activites since 5 days in future', () => {
      const a = activitiesSince(activityHistory, getTimestampInFuture());
      assert.equal(_.size(a), 0);
    });
  });

  describe('getActivities()', () => {
    it('should handle timeSince variable', () => {
      const a = getActivities(
        activityList,
        activityHistory,
        getPastTimestamp(14),
      );
      assert.equal(_.size(a), 3);
    });

    it('should handle no timeSince variable', () => {
      const a = getActivities(activityList, activityHistory);
      assert.equal(_.size(a), 1);
    });
  });

  describe('getActivitiesText()', () => {
    it('should handle timeSince variable', () => {
      const a = getActivitiesText(
        activityList,
        activityHistory,
        getPastTimestamp(13),
      );
      assert.equal(a.includes('Made the bed'), true);
      assert.equal(a.includes('ago'), true);
    });

    it('should handle no timeSince variable', () => {
      const a = getActivitiesText(activityList, activityHistory);
      assert.equal(a.includes('Made the bed'), false);
      assert.equal(a.includes('ago'), true);
    });
  });

  describe('getLastActivity()', () => {
    it('should handle activityKey', () => {
      const a = getLastActivity(activityList, activityHistory, 'made-bed');
      assert.equal(_.get(a, 'activity'), 'made-bed');
    });

    it('should handle no activityKey', () => {
      const a = getLastActivity(activityList, activityHistory);
      assert.equal(_.get(a, 'activity'), 'shower');
    });
  });
});
