import {
  corsSuccessResponse,
  corsErrorResponse,
  runWarm,
  getOrCreateUser,
  addActivityToDb,
  ActivityRecord
} from './utils';

const addActivity: Function = async (event: AWSLambda.APIGatewayEvent) => {
  const timestamp = new Date().getTime();
  const activity: {
    activity: string,
    name: string,
    type: string,
    category: string,
    icon: string,
    points: number,
    cooldown: number,
    frequency: number,
    frequencyPeriod: string,
  } = JSON.parse(event.body || '{}');
  // @ts-ignore
  const account = event.pathParameters.userId.toLowerCase();
  // @ts-ignore
  let userActivities: Array<ActivityRecord> = [];

  if (account) {
    const user = await getOrCreateUser(account);
    if (user) {
      userActivities = JSON.parse(user.activities);
      if (userActivities.filter((e) => e.activity === activity.activity).length === 0) {
        const newActivity: ActivityRecord = {
          activity: activity.activity,
          name: activity.name || 'Default activity',
          type: activity.type || 'chain',
          category: activity.category || 'home',
          icon: activity.icon || 'one-up',
          points: activity.points || 1,
          cooldown: activity.cooldown || 30,
          frequency: activity.frequency || 1,
          frequencyPeriod: activity.frequencyPeriod || 'day',
          timestamp,
          updated: timestamp,
        };
        userActivities.push(newActivity);
      } else {
        return corsErrorResponse({ error: `activity with key '${activity.activity}' already exists` });
      }
    }

    try {
      const result = await addActivityToDb(account, userActivities);
      console.log(result);
      const response = corsSuccessResponse({ success: true });
      return response;
    } catch (err) {
      const response = corsErrorResponse({ error: err });
      return response;
    }
  }
};

export default runWarm(addActivity);
