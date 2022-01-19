/* eslint-disable import/prefer-default-export */
import { IActivityHistory } from '@one-up/common';
import { addActivityHistoryToDb } from './one-up-queries';

export const addHistoryForActivity = async (
  user: string,
  activityKey: string,
  activityHistory: IActivityHistory[],
): Promise<any> => {
  const timestamp = new Date().toISOString();

  activityHistory.push({
    activity: activityKey,
    timestamp,
  });

  return addActivityHistoryToDb(user, activityHistory)
    .then((updatedHistory: any) => Promise.resolve(updatedHistory))
    .catch((error: any) => Promise.reject(error));
};
