import { APIGatewayEvent } from 'aws-lambda';
import _ from 'lodash';
import { IActivity } from '@one-up/common';
import {
  corsSuccessResponse,
  corsErrorResponse,
  runWarm,
  getOrCreateUser,
  updateActivities,
} from './utils';
import { invalidAddress } from './utils/temp';

const updateActivity: Function = async (
  event: APIGatewayEvent,
): Promise<any> => {
  // @ts-ignore
  const { userId, activityKey } = _.get(event, 'pathParameters');
  const activityData: IActivity = JSON.parse(event.body || '{}');
  activityData.points = parseFloat(_.get(activityData, 'points'));

  if (!userId || !activityKey || !activityData || invalidAddress(userId)) {
    return corsErrorResponse({ error: 'No id or key found' });
  }
  return getOrCreateUser(_.toLower(userId))
    .then((user) => {
      const activitiesList = JSON.parse(_.get(user, 'activities'));
      // console.log(activitiesList);
      const filteredActivities = _.filter(
        activitiesList,
        (activity: any) => activity.activity !== activityData.activity,
      );
      const updatedActivities = [...filteredActivities, activityData];
      return updateActivities(_.toLower(userId), updatedActivities)
        .then((result) =>
          corsSuccessResponse({ activities: updatedActivities, result }),
        )
        .catch((error) => corsErrorResponse({ error }));
    })
    .catch((error) => corsErrorResponse({ error }));
};

export default runWarm(updateActivity);
