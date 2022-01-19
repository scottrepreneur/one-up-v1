import { parseISO, isAfter, formatDistanceToNow } from 'date-fns';
import _ from 'lodash';

import { IActivityHistory, IActivity } from './definitions';
import { handleTimestamp } from './general';

export const activitiesSince = (
  activityHistory: IActivityHistory[],
  timeSince: string,
) => {
  return _.filter(activityHistory, (e) =>
    isAfter(parseISO(e.timestamp), parseISO(timeSince)),
  );
};

export const getActivities = (
  activities: IActivity[],
  activityHistory: IActivityHistory[],
  timeSince?: string,
) => {
  const timeSinceActivities = activitiesSince(
    activityHistory,
    timeSince || handleTimestamp(),
  );

  return _.map(timeSinceActivities, (item: IActivityHistory) => {
    const activity = _.find(activities, ['activity', _.get(item, 'activity')]);

    return {
      ...item,
      points: _.get(activity, 'points'),
      name: _.get(activity, 'name'),
    };
  });
};

export const getActivitiesText = (
  activities: IActivity[],
  activityHistory: IActivityHistory[],
  timeSince?: string,
) => {
  const timeSinceActivities = activitiesSince(
    activityHistory,
    timeSince || handleTimestamp(),
  );

  const activityStrings = _.map(
    timeSinceActivities,
    (item: IActivityHistory) => {
      const activity = _.find(activities, [
        'activity',
        _.get(item, 'activity'),
      ]);

      return `${_.get(activity, 'name')}`
        .concat(` | ${_.get(activity, 'points')} points`)
        .concat(
          ` | ${formatDistanceToNow(parseISO(_.get(item, 'timestamp')))} ago`,
        );
    },
  );

  return _.join(activityStrings, '\n');
};

export const getLastActivity = (
  activities: IActivity[],
  activityHistory: IActivityHistory[],
  activityKey?: string,
) => {
  const recentActivities = _.orderBy(
    activityKey
      ? _.filter(activityHistory, ['activity', activityKey])
      : activityHistory,
    (a) => parseISO(_.get(a, 'timestamp')),
    'desc',
  );

  const lastActivity = _.find(activities, [
    'activity',
    _.get(_.first(recentActivities), 'activity'),
  ]);
  return {
    ...lastActivity,
    ..._.first(recentActivities),
  };
};
