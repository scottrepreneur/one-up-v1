import { sub } from 'date-fns';

const activityHistory = [
  {
    activity: 'shower',
    timestamp: new Date().toISOString(),
  },
  {
    activity: 'teeth',
    timestamp: sub(new Date(), { hours: 4 }).toISOString(),
  },
  {
    activity: 'made-bed',
    timestamp: sub(new Date(), { hours: 6 }).toISOString(),
  },
  {
    activity: 'made-bed',
    timestamp: sub(new Date(), { days: 5 }).toISOString(),
  },
  {
    activity: 'shower',
    timestamp: sub(new Date(), { days: 13 }).toISOString(),
  },
  {
    activity: 'made-bed',
    timestamp: sub(new Date(), { days: 14, hours: 10 }).toISOString(),
  },
  {
    activity: 'teeth',
    timestamp: sub(new Date(), { days: 20 }).toISOString(),
  },
];

export default activityHistory;
