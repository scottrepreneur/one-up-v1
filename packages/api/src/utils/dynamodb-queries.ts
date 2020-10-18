const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const getUser = async (
  user: string,
): Promise<{
  Items: any[],
  Count: number,
  ScannedCount: number
}> => {
  const params = {
    TableName: process.env.DYNAMODB_USERS_TABLE,
    KeyConditionExpression: 'user = :hkey',
    ExpressionAttributeValues: {
      ':hkey': user,
    },
  };

  return new Promise((res, rej) => {
    dynamoDb.query(params, (err: any, data: any) => {
      if (err) {
        console.log('Error', err);
        rej(err);
      } else {
        res(data);
      }
    });
  });
};

const addRecord = (params: any) => {
  return new Promise((res, rej) => {
    dynamoDb.put(params, (err: any, data: any) => {
      if (err) {
        console.log('Error', err);
        rej(err);
      } else {
        res(data);
      }
    });
  });
};

const getOrCreateUser = async (user: string) => {
  const timestamp = new Date().getTime();

  const userRecord = await getUser(user);

  if (userRecord.Items.length > 0) {
    return userRecord.Items[0];
  }

  const newUserRecord = {
    address: user,
    currentGoal: 1,
    goalHistory: [],
    activities: JSON.stringify([]),
    activitiesTimeline: JSON.stringify([]),
    email: '',
    emailPreferences: JSON.stringify({
      marketing: false,
      notifications: true,
    }),
    created: timestamp,
    updated: timestamp,
  };

  const newUserParams = {
    TableName: process.env.DYNAMODB_USERS_TABLE,
    Item: newUserRecord,
  };

  try {
    const newRecord = await addRecord(newUserParams);
    console.log('User created', newRecord);
    return newUserRecord;
  } catch (err) {
    console.log('User couldn\'t be created');
    return err;
  }
};

export default getOrCreateUser;
