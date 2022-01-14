import { sub } from 'date-fns';

const activityHistory = [
  {
    activity: 'made-bed',
    timestamp: sub(new Date(), { days: 14, hours: 10 }).toISOString(),
  },
  {
    activity: 'shower',
    timestamp: sub(new Date(), { days: 13 }).toISOString(),
  },
  {
    activity: 'made-bed',
    timestamp: sub(new Date(), { days: 5 }).toISOString(),
  },
  {
    activity: 'teeth',
    timestamp: sub(new Date(), { days: 20 }).toISOString(),
  },
  {
    activity: 'shower',
    timestamp: new Date().toISOString(),
  },
];

export default activityHistory;
