export interface IActivity {
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

export interface IActivityHistory {
  activity: string;
  timestamp: string;
}

export interface IGoal {
  goal: number;
  timestamp: string;
}

export interface IUser {
  userId: string;
  currentGoal: number;
  goalHistory: Array<string>;
  activities: Array<IActivity>;
  activitiesTimeline: Array<IActivityHistory>;
  email: string;
  emailPreferences: {
    marketing: boolean;
    notifications: boolean;
  };
  timestamp: string;
  updated: string;
  timezone: string;
}

export interface IStringifiedUser {
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

export interface IExtendedActivityHistory {
  activity: string;
  timestamp: string;
  name: string;
  points: number;
}
