import { APIGatewayEvent } from 'aws-lambda';
import {
  corsSuccessResponse,
  corsErrorResponse,
  runWarm,
  getOrCreateUser,
  ActivityRecord,
  ActivityHistoryRecord,
} from './utils';

const getActivityHistory: Function = async (event: APIGatewayEvent) => {
  // @ts-ignore
  const account = event.pathParameters.userId.toLowerCase();

  if (account) {
    const user = await getOrCreateUser(account);
    const activities = JSON.parse(user.activities);

    const returnActivityTimeline = JSON.parse(user.activitiesTimeline).map((h: ActivityHistoryRecord) => {
      const activity: ActivityRecord = activities.filter((a: ActivityRecord) => a.activity === h.activity)[0];
      return {
        ...h,
        points: activity.points,
        name: activity.name,
      };
    });

    return corsSuccessResponse(returnActivityTimeline);
  }
  return corsErrorResponse({ error: 'No user found' });
};

export default runWarm(getActivityHistory);
