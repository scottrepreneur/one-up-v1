import {
  corsSuccessResponse,
  corsErrorResponse,
  runWarm,
  getOrCreateUser,
  addActivityHistoryToDb,
  ActivityHistoryRecord,
} from './utils';

const addActivityHistory: Function = async (event: AWSLambda.APIGatewayEvent) => {
  const timestamp = new Date().getTime();
  // @ts-ignore
  const account = event.pathParameters.userId.toLowerCase();
  // @ts-ignore
  const activityKey = event.pathParameters.activityKey.toLowerCase();
  let userActivityHistory: Array<ActivityHistoryRecord> = [];

  if (account) {
    try {
      const user = await getOrCreateUser(account);

      userActivityHistory = JSON.parse(user.activitiesTimeline);
      const userActivities = JSON.parse(user.activities);
      console.log(userActivities);

      // check the activity exists for the user
      if (userActivities.filter((e: any) => e.activity === activityKey).length > 0) {
        console.log(activityKey);
        const { cooldown } = userActivities.filter((e: any) => e.activity === activityKey)[0];

        // activity has been recorded in timeline before
        if (userActivityHistory.filter((e: any) => e.activity === activityKey).length > 0) {
          const lastActivity: ActivityHistoryRecord = userActivityHistory.filter((e: any) => e.activity === activityKey).sort((e: any) => e.timestamp)[0];

          // check cooldown has passed since last activity recorded
          if (timestamp - lastActivity.timestamp > cooldown) {
            userActivityHistory.push({
              activity: activityKey,
              timestamp,
            });

            try {
              const result = await addActivityHistoryToDb(account, userActivityHistory);
              console.log(result);
              return corsSuccessResponse({ success: true });
            } catch (err) {
              return corsErrorResponse({ error: err });
            }
          }
        } else {
          userActivityHistory.push({
            activity: activityKey,
            timestamp,
          });

          try {
            const result = await addActivityHistoryToDb(account, userActivityHistory);
            console.log(result);
            return corsSuccessResponse({ success: true });
          } catch (err) {
            return corsErrorResponse({ error: err });
          }
        }

        return corsErrorResponse({ error: `No activity found with key: ${activityKey}` });
      }
    } catch (err) {
      console.log(err);
      return corsErrorResponse({ error: err });
    }
  }
  return corsErrorResponse({ error: 'No `userId` found' });
};

export default runWarm(addActivityHistory);
