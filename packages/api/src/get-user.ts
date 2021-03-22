import { APIGatewayEvent } from 'aws-lambda';
import {
  corsSuccessResponse,
  corsErrorResponse,
  runWarm,
  getOrCreateUser,
  getScore,
  getActivities,
  getActivitiesText,
  getLastActivity,
  getStreak,
} from './utils';

const getUser: Function = async (event: APIGatewayEvent) => {
  // @ts-ignore
  const account = event.pathParameters.userId.toLowerCase();

  if (account) {
    const user = await getOrCreateUser(account);
    // console.log('points 24hr: ', getScore(JSON.parse(user.activities), JSON.parse(user.activitiesTimeline), 86400));

    return corsSuccessResponse({
      user: user.userId,
      pointsToday: getScore(
        JSON.parse(user.activities),
        JSON.parse(user.activitiesTimeline),
      ),
      activitiesToday: getActivities(
        JSON.parse(user.activities),
        JSON.parse(user.activitiesTimeline),
      ),
      activitiesTodayText: getActivitiesText(
        JSON.parse(user.activities),
        JSON.parse(user.activitiesTimeline),
      ),
      lastActivity: getLastActivity(
        JSON.parse(user.activities),
        JSON.parse(user.activitiesTimeline),
      ),
      currentGoal: user.currentGoal,
      currentStreak: getStreak(
        JSON.parse(user.activities),
        JSON.parse(user.activitiesTimeline),
        JSON.parse(user.goalHistory),
      ),

    });
  }
  return corsErrorResponse({ error: 'No user found' });
};

export default runWarm(getUser);
