import { APIGatewayEvent } from 'aws-lambda';
import {
  corsSuccessResponse,
  corsErrorResponse,
  runWarm,
  getOrCreateUser,
  getScore,
  getActivities,
  getActivitiesText,
} from './utils';

const getUser: Function = async (event: APIGatewayEvent) => {
  // @ts-ignore
  const account = event.pathParameters.userId.toLowerCase();

  if (account) {
    const user = await getOrCreateUser(account);
    console.log('points 24hr: ', getScore(JSON.parse(user.activities), JSON.parse(user.activitiesTimeline), 86400));

    return corsSuccessResponse({
      user: user.userId,
      pointsToday: getScore(
        JSON.parse(user.activities),
        JSON.parse(user.activitiesTimeline), 86400,
      ),
      activitiesToday: getActivities(
        JSON.parse(user.activities),
        JSON.parse(user.activitiesTimeline), 86400,
      ),
      activitiesTodayText: getActivitiesText(
        JSON.parse(user.activities),
        JSON.parse(user.activitiesTimeline), 86400,
      ),
      currentGoal: user.currentGoal,
      currentStreak: 0,

    });
  }
  return corsErrorResponse({ error: 'No user found' });
};

export default runWarm(getUser);
