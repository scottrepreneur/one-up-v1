import { APIGatewayEvent } from 'aws-lambda';
import _ from 'lodash';
import {
  getActivities,
  getActivitiesText,
  getLastActivity,
  getStreak,
  getScore,
} from '@one-up/common';
import {
  corsSuccessResponse,
  corsErrorResponse,
  runWarm,
  getOrCreateUser,
} from './utils';

const getUser: Function = async (event: APIGatewayEvent) => {
  const account = _.get(event, 'pathParameters.userId');
  if (!account) {
    return corsErrorResponse({ error: 'No user found' });
  }
  return getOrCreateUser(account).then((user) =>
    corsSuccessResponse({
      user: _.get(user, 'userId'),
      pointsToday: getScore(
        JSON.parse(_.get(user, 'activities')),
        JSON.parse(_.get(user, 'activitiesTimeline')),
      ),
      activitiesToday: getActivities(
        JSON.parse(_.get(user, 'activities')),
        JSON.parse(_.get(user, 'activitiesTimeline')),
      ),
      activitiesTodayText: getActivitiesText(
        JSON.parse(_.get(user, 'activities')),
        JSON.parse(_.get(user, 'activitiesTimeline')),
      ),
      lastActivity: getLastActivity(
        JSON.parse(_.get(user, 'activities')),
        JSON.parse(_.get(user, 'activitiesTimeline')),
      ),
      currentGoal: _.get(user, 'currentGoal'),
      currentStreak: getStreak(
        JSON.parse(_.get(user, 'activities')),
        JSON.parse(_.get(user, 'activitiesTimeline')),
        JSON.parse(_.get(user, 'goalHistory')),
      ),
    }),
  );
};

export default runWarm(getUser);
