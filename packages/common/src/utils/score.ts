import _ from 'lodash';

import { IActivityHistory, IActivity } from './definitions';
import { handleTimestamp } from './general';
import { activitiesSince } from './activities';

export const getScore = (
  activities: IActivity[],
  activityHistory: IActivityHistory[],
  timeSince?: string,
) => {
  const timeSinceActivities = activitiesSince(
    activityHistory,
    timeSince || handleTimestamp(),
  );

  const activitiesWithPoints = _.map(
    timeSinceActivities,
    (item: IActivityHistory) =>
      _.get(
        _.find(activities, ['activity', _.get(item, 'activity')]),
        'points',
      ),
  );

  return _.sum(activitiesWithPoints);
};

export const pointsForTimePeriod = (
  activities: IActivity[],
  activitiesForTimePeriod: IActivityHistory[],
): number => {
  return (
    _.sum(
      _.map(activitiesForTimePeriod, (e) =>
        _.get(_.find(activities, ['activity', e.activity]), 'points'),
      ),
    ) || 0
  );
};
