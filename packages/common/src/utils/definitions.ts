export interface ActivityRecord {
  activity: string;
  name: string;
  type: string;
  category: string;
  icon: string;
  points: any;
  cooldown: number;
  frequency: number;
  frequencyPeriod: string;
  timestamp: string;
  updated: string;
}

export interface ActivityHistoryRecord {
  activity: string;
  timestamp: string;
}

export interface GoalRecord {
  goal: number;
  timestamp: string;
}

export interface UserRecord {
  userId: string;
  currentGoal: number;
  goalHistory: Array<string>;
  activities: Array<ActivityRecord>;
  activitiesTimeline: Array<ActivityHistoryRecord>;
  email: string;
  emailPreferences: {
    marketing: boolean;
    notifications: boolean;
  };
  timestamp: string;
  updated: string;
  timezone: string;
}

export interface StringifiedUserRecord {
  userId: string;
  currentGoal: number;
  goalHistory: string;
  activities: string;
  activitiesTimeline: string;
  email: string;
  emailPreferences: string;
  timestamp: string;
  updated: string;
  timezone: string;
}

export interface ExtendedActivityHistoryRecord {
  activity: string;
  timestamp: string;
  name: string;
  points: number;
}
