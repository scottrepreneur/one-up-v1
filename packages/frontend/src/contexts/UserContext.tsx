// @ts-nocheck
import React, {
  createContext, useContext, useState, useEffect,
} from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const ADDRESS = process.env.REACT_APP_ACCOUNT;

export const UserContext = createContext(null);

interface UserContextProps {
  children: React.ReactNode;
}

export const UserContextProvider: React.FC<UserContextProps> = ({ children }: UserContextProps) => {
  // const { address } = useInjectedProvider();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [activityHistory, setActivityHistory] = useState([]);
  const [activities, setActivities] = useState([]);

  const getActivityHistory = async () => {
    try {
      const result = await axios.get(`${API_URL}/user/${ADDRESS}/activities/history`);
      setActivityHistory(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getActivities = async () => {
    try {
      const result = await axios.get(`${API_URL}/user/${ADDRESS}/activities`);
      setActivities(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getUser = async () => {
    try {
      const result = await axios.get(`${API_URL}/user/${ADDRESS}`);
      setUserData(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getData = async () => {
      await getUser();
      await getActivityHistory();
      await getActivities();
      setLoading(false);
    };
    getData();
  }, []);

  const recordActivity = async (activity) => {
    try {
      const result = await axios.post(`${API_URL}/user/${ADDRESS}/activities/${activity}`);
      console.log(result);
      // TODO return history here instead
      getActivityHistory();
      return activity;
    } catch (err) {
      console.log(err);
      return { error: true };
    }
  };

  const createActivity = async (activity) => {
    try {
      const result = await axios.post(`${API_URL}/user/${ADDRESS}/activities`, activity);
      setActivities(result.data.activities);
      return activity;
    } catch (err) {
      console.log(err);
      return { error: true };
    }
  };

  const updateActivity = async (activity) => {
    try {
      const result = await axios.put(`${API_URL}/user/${ADDRESS}/activities/${activity.activity}/edit`, activity);
      setActivities(result.data.activities);
      const updatedActivity = result.data.activities[result.data.activities.length - 1];
      return updatedActivity;
    } catch (err) {
      console.log(err);
      return { error: true };
    }
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        activityHistory,
        activities,
        recordActivity,
        createActivity,
        updateActivity,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const {
    userData,
    activityHistory,
    activities,
    recordActivity,
    createActivity,
    updateActivity,
    loading,
  } = useContext(UserContext);
  return {
    userData,
    activityHistory,
    activities,
    recordActivity,
    createActivity,
    updateActivity,
    loading,
  };
};
