import { APIGatewayEvent } from 'aws-lambda';
import _ from 'lodash';
import {
  corsSuccessResponse,
  corsErrorResponse,
  runWarm,
  getOrCreateUser,
} from './utils';

const getUser: Function = async (event: APIGatewayEvent) => {
  const account = _.toLower(_.get(event, 'pathParameters.userId'));

  if (!account) {
    return corsErrorResponse({ error: 'No user found' });
  }
  return getOrCreateUser(account)
    .then((user) => corsSuccessResponse(JSON.parse(_.get(user, 'activities'))))
    .catch((error) => corsErrorResponse({ error }));
};

export default runWarm(getUser);
