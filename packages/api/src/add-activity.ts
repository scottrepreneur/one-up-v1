import { APIGatewayEvent } from 'aws-lambda';
import _ from 'lodash';
import { IActivity } from '@one-up/common';
import {
  corsSuccessResponse,
  corsErrorResponse,
  runWarm,
  getOrCreateUser,
  addActivityToDb,
} from './utils';
import { invalidAddress } from './utils/temp';

const addActivity: Function = async (event: APIGatewayEvent) => {
  const timestamp = new Date().toISOString();
  const activity: IActivity = JSON.parse(_.get(event, 'body') || '{}');
  const account = _.toLower(_.get(event, 'pathParameters.userId'));
  let userActivities: IActivity[] = [];

  if (!account || invalidAddress(account)) {
    return corsErrorResponse({ error: 'No userId found' });
  }

  return getOrCreateUser(account).then((user) => {
    userActivities = JSON.parse(_.get(user, 'activities'));

    if (!_.isEmpty(_.filter(userActivities, ['activity', activity.activity]))) {
      return corsErrorResponse({
        error: `activity with key '${activity.activity}' already exists`,
      });
    }

    const newActivity: IActivity = {
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

    return addActivityToDb(account, userActivities)
      .then((result) => corsSuccessResponse({ success: true, result }))
      .catch((error) => corsErrorResponse({ error }));
  });
};

export default runWarm(addActivity);
