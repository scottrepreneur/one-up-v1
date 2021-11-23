import AWS from 'aws-sdk';
import {
  ActivityRecord,
  StringifiedUserRecord,
  ActivityHistoryRecord,
} from '@one-up/common';

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const getUser = async (
  user: string
): Promise<{
  Items: any[];
  Count: number;
  ScannedCount: number;
}> => {
  const params: any = {
    TableName: process.env.DYNAMODB_USERS_TABLE,
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': user,
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

const addRecord = (params: any) =>
  new Promise((res, rej) => {
    dynamoDb.put(params, (err: any, data: any) => {
      if (err) {
        console.log('Error', err);
        rej(err);
      } else {
        res(data);
      }
    });
  });

export const getOrCreateUser = async (user: string) => {
  const timestamp = new Date().toISOString();

  const userRecord = await getUser(user);

  if (userRecord.Items.length > 0) {
    return userRecord.Items[0];
  }

  const newUserRecord: StringifiedUserRecord = {
    userId: user,
    currentGoal: 1,
    goalHistory: JSON.stringify([{ goal: 1, timestamp }]),
    activities: JSON.stringify([]),
    activitiesTimeline: JSON.stringify([]),
    email: '',
    emailPreferences: JSON.stringify({
      marketing: false,
      notifications: true,
    }),
    timestamp,
    updated: timestamp,
    timezone: 'America/Chicago', // handle other timezones
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
    console.log("User couldn't be created");
    return err;
  }
};

export const updateUser = (params: any) =>
  new Promise((res, rej) => {
    dynamoDb.update(params, (err: any, data: any) => {
      if (err) {
        console.log('Error', err);
        rej(err);
      } else {
        res(data);
      }
    });
  });

export const addActivityToDb = async (
  account: string,
  activityList: ActivityRecord[]
) => {
  const timestamp = new Date().toISOString();
  const params: any = {
    TableName: process.env.DYNAMODB_USERS_TABLE,
    Key: {
      userId: account,
    },
    ExpressionAttributeNames: {
      '#activities': 'activities',
      '#updated': 'updated',
    },
    ExpressionAttributeValues: {
      ':activities': JSON.stringify(activityList),
      ':updated': timestamp,
    },
    UpdateExpression: 'SET #activities = :activities, #updated = :updated',
    ReturnValues: 'ALL_NEW',
  };

  try {
    const result = await updateUser(params);
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  }
  return null;
};

export const addActivityHistoryToDb = async (
  account: string,
  userActivityHistory: ActivityHistoryRecord[]
) => {
  const timestamp = new Date().toISOString();
  const params: any = {
    TableName: process.env.DYNAMODB_USERS_TABLE,
    Key: {
      userId: account,
    },
    ExpressionAttributeNames: {
      '#activitiesTimeline': 'activitiesTimeline',
      '#updated': 'updated',
    },
    ExpressionAttributeValues: {
      ':activitiesTimeline': JSON.stringify(userActivityHistory),
      ':updated': timestamp,
    },
    UpdateExpression:
      'SET #activitiesTimeline = :activitiesTimeline, #updated = :updated',
    ReturnValues: 'ALL_NEW',
  };

  try {
    const result = await updateUser(params);
    return result;
  } catch (err) {
    console.log(err);
    return { error: err };
  }
};

export const updateActivities = async (
  account: string,
  activities: ActivityRecord[]
) => {
  const timestamp = new Date().toISOString();
  const params: any = {
    TableName: process.env.DYNAMODB_USERS_TABLE,
    Key: {
      userId: account,
    },
    ExpressionAttributeNames: {
      '#activities': 'activities',
      '#updated': 'updated',
    },
    ExpressionAttributeValues: {
      ':activities': JSON.stringify(activities),
      ':updated': timestamp,
    },
    UpdateExpression: 'SET #activities = :activities, #updated = :updated',
    ReturnValues: 'ALL_NEW',
  };

  try {
    const result = await updateUser(params);
    return result;
  } catch (err) {
    console.log(err);
    return { error: err };
  }
};
