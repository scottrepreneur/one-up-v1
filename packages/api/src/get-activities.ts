import {
  corsSuccessResponse,
  corsErrorResponse,
  runWarm,
  getOrCreateUser,
} from './utils';

const getUser: Function = async (event: AWSLambda.APIGatewayEvent) => {
  // @ts-ignore
  const account = event.pathParameters.userId.toLowerCase();

  if (account) {
    const user = await getOrCreateUser(account);

    return corsSuccessResponse(JSON.parse(user.activities));
  }
  return corsErrorResponse({ error: 'No user found' });
};

export default runWarm(getUser);
