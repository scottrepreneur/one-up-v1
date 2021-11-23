import { APIGatewayEvent } from 'aws-lambda';
import {
  sub,
  parseISO,
  isAfter,
} from 'date-fns';
import {
  corsSuccessResponse,
  corsErrorResponse,
  runWarm,
  getOrCreateUser,
  addActivityHistoryToDb,
  ActivityHistoryRecord,
} from './utils';

const addActivityHistory: Function = async (event: APIGatewayEvent) => {
  const timestamp = new Date().toISOString();
  const account: any = event.pathParameters?.userId?.toLowerCase();
  const activityKey: any = event.pathParameters?.activityKey?.toLowerCase();
  let userActivityHistory: ActivityHistoryRecord[] = [];

  if (account) {
    try {
      const user = await getOrCreateUser(account);

      userActivityHistory = JSON.parse(user.activitiesTimeline);
      const userActivities = JSON.parse(user.activities);

      // check the activity exists for the user
      if (userActivities.filter((e: any) => e.activity === activityKey).length > 0) {
        const { cooldown } = userActivities.filter((e: any) => e.activity === activityKey)[0];

        // activity has been recorded in timeline before
        if (userActivityHistory.filter((e: any) => e.activity === activityKey).length > 0) {
          const lastActivity: ActivityHistoryRecord = userActivityHistory
            .filter((e: any) => e.activity === activityKey)
            .sort((a: any, b: any) => (
              parseISO(b.timestamp).getTime() - parseISO(a.timestamp).getTime()))[0];

          // check cooldown has passed since last activity recorded
          if (isAfter(
            sub(parseISO(timestamp), { minutes: cooldown }),
            parseISO(lastActivity.timestamp),
          )) {
            userActivityHistory.push({
              activity: activityKey,
              timestamp,
            });

            try {
              await addActivityHistoryToDb(account, userActivityHistory);
              // console.log(result);
              return corsSuccessResponse({ success: true });
            } catch (err) {
              return corsErrorResponse({ error: err });
            }
          } else {
            // TODO update activity cool down time
            return corsErrorResponse({
              error:
              `Cool down for ${activityKey} has not expired. Try again in [TODO]`,
            });
          }
        } else {
          userActivityHistory.push({
            activity: activityKey,
            timestamp,
          });

          try {
            const result = await addActivityHistoryToDb(account, userActivityHistory);
            return corsSuccessResponse({ success: result });
          } catch (err) {
            return corsErrorResponse({ error: err });
          }
        }
      }

      return corsErrorResponse({ error: `No activity found with key: ${activityKey}` });
    } catch (err) {
      console.log(err);
      return corsErrorResponse({ error: err });
    }
  }
  return corsErrorResponse({ error: 'No `userId` found' });
};

export default runWarm(addActivityHistory);
