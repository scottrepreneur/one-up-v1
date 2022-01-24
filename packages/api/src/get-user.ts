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
  return getOrCreateUser(account).then((user) => {
    const activities = JSON.parse(_.get(user, 'activities'));
    const timeline = JSON.parse(_.get(user, 'activitiesTimeline'));

    return corsSuccessResponse({
      user: _.get(user, 'userId'),
      pointsToday: getScore(activities, timeline),
      activitiesToday: getActivities(activities, timeline),
      activitiesTodayText: getActivitiesText(activities, timeline),
      lastActivity: getLastActivity(activities, timeline),
      currentGoal: _.get(user, 'currentGoal'),
      currentStreak: getStreak(
        activities,
        timeline,
        JSON.parse(_.get(user, 'goalHistory')),
      ),
    });
  });
};

export default runWarm(getUser);
