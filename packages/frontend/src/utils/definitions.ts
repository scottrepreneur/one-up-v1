export interface UserRecord {
  userId: string;
  currentGoal: number;
  goalHistory: Array<string>;
  activities: Array<ActivityRecord>,
  activitiesTimeline: Array<ActivityHistoryRecord>,
  email: string,
  emailPreferences: {
    marketing: boolean;
    notifications: boolean;
  };
  created: number;
  updated: number;
}

export interface StringifiedUserRecord {
  userId: string;
  currentGoal: number;
  goalHistory: string;
  activities: string,
  activitiesTimeline: string,
  email: string,
  emailPreferences: string;
  created: number;
  updated: number;
}

export interface ActivityRecord {
  activity: string;
  name: string;
  type: string;
  category: string;
  icon: string;
  points: number;
  cooldown: number;
  frequency: number;
  frequencyPeriod: string;
  timestamp: number;
  updated: number;
}

export interface ActivityHistoryRecord {
  activity: string;
  timestamp: number;
}
