import { APIGatewayEvent } from 'aws-lambda';
import _ from 'lodash';
import { IActivity, IActivityHistory } from '@one-up/common';
import {
  corsSuccessResponse,
  corsErrorResponse,
  runWarm,
  getOrCreateUser,
} from './utils';

const getActivityHistory: Function = async (event: APIGatewayEvent) => {
  const account = _.get(event, 'pathParameters.userId');

  if (!account) {
    return corsErrorResponse({ error: 'No user found' });
  }
  return getOrCreateUser(account)
    .then((user) => {
      const activities = JSON.parse(_.get(user, 'activities'));

      const returnActivityTimeline = JSON.parse(
        _.get(user, 'activitiesTimeline'),
      ).map((historyRecord: IActivityHistory) => {
        const activity: IActivity = _.first(
          _.filter(activities, ['activity', historyRecord.activity]),
        );
        return {
          ...historyRecord,
          ...activity,
        };
      });

      return corsSuccessResponse(returnActivityTimeline);
    })
    .catch((error) => corsErrorResponse({ error }));
};

export default runWarm(getActivityHistory);
