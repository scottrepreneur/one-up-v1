import _ from 'lodash';
import { IActivity, IStringifiedUser, IActivityHistory } from '@one-up/common';
import { queryRecord, updateRecord, addRecord } from './dynamodb-queries';

const getUser = async (user: string): Promise<any> => {
  const params: any = {
    TableName: process.env.DYNAMODB_USERS_TABLE,
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': _.toLower(user),
    },
  };

  return queryRecord(params)
    .then((record) => Promise.resolve(record))
    .catch((error) => Promise.reject(error));
};

const newUserRecordParams = (user: any) => {
  const timestamp = new Date().toISOString();
  return {
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
    timezone: 'America/Chicago', // TODO handle other timezones
  };
};

export const getOrCreateUser = async (user: string): Promise<any> =>
  getUser(user).then((userRecord) => {
    if (_.gt(_.size(_.get(userRecord, 'Items')), 0)) {
      return Promise.resolve(userRecord.Items[0]);
    }

    const newUserRecord: IStringifiedUser = newUserRecordParams(user);

    const newUserParams = {
      TableName: process.env.DYNAMODB_USERS_TABLE,
      Item: newUserRecord,
    };

    return addRecord(newUserParams)
      .then((newRecord) => Promise.resolve(newRecord))
      .catch((error) => Promise.reject(error));
  });

export const addActivityToDb = async (
  account: string,
  activityList: IActivity[],
): Promise<any> => {
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

  return updateRecord(params)
    .then((updatedRecord) => Promise.resolve(updatedRecord))
    .catch((error) => Promise.reject(error));
};

export const addActivityHistoryToDb = async (
  account: string,
  userActivityHistory: IActivityHistory[],
): Promise<any> => {
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

  return updateRecord(params)
    .then((updatedRecord) => Promise.resolve(updatedRecord))
    .catch((error) => Promise.reject(error));
};

export const updateActivities = async (
  account: string,
  activities: IActivity[],
): Promise<any> => {
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

  return updateRecord(params)
    .then((updatedRecord) => Promise.resolve(updatedRecord))
    .catch((error) => Promise.reject(error));
};
