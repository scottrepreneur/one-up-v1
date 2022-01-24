import assert from 'assert';
import _ from 'lodash';
import activityList from './fixtures/activities';
import activityHistory from './fixtures/activityHistory';
import goalHistory from './fixtures/goalHistory';

import { getStreak } from '../utils/user';

const todayUtc = () => _.gt(new Date().getHours(), 6); // TODO handle differnt timezone

describe('User Utilities', () => {
  describe('getStreak()', () => {
    it('should return 0 for current streak, depending on todayUtc', () => {
      const a = getStreak(activityList, activityHistory, goalHistory);
      console.log(a);
      assert.equal(a, todayUtc() ? 1 : 0);
    });
  });
});
