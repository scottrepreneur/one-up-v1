import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import _ from 'lodash';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const ADDRESS = process.env.REACT_APP_ACCOUNT;

export const UserContext: any = createContext(null);

interface UserContextProps {
  children: ReactNode;
}

export const UserContextProvider: React.FC<UserContextProps> = ({
  children,
}: UserContextProps) => {
  // const { address } = useInjectedProvider();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [activityHistory, setActivityHistory] = useState([]);
  const [activities, setActivities] = useState([]);

  const getActivityHistory = async (): Promise<any> => {
    try {
      const result = await axios.get(
        `${API_URL}/user/${ADDRESS}/activities/history`,
      );
      setActivityHistory(_.get(result, 'data'));
    } catch (err) {
      console.log(err);
    }
  };

  const getActivities = async (): Promise<any> => {
    try {
      const result = await axios.get(`${API_URL}/user/${ADDRESS}/activities`);
      setActivities(_.get(result, 'data'));
    } catch (err) {
      console.log(err);
    }
  };

  const getUser = async (): Promise<any> => {
    try {
      const result = await axios.get(`${API_URL}/user/${ADDRESS}`);
      setUserData(_.get(result, 'data'));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getData = async (): Promise<any> => {
      await getUser();
      await getActivityHistory();
      await getActivities();
      setLoading(false);
    };
    getData();
  }, []);

  const recordActivity = async (activity: any): Promise<any> => {
    try {
      const result = await axios.post(
        `${API_URL}/user/${ADDRESS}/activities/${activity}`,
      );
      console.log(result);
      // TODO return history here instead
      getActivityHistory();
      return activity;
    } catch (err) {
      console.log(err);
      return { error: true };
    }
  };

  const createActivity = async (activity: any): Promise<any> => {
    try {
      const result = await axios.post(
        `${API_URL}/user/${ADDRESS}/activities`,
        activity,
      );
      setActivities(_.get(result, 'data.activities'));
      return activity;
    } catch (err) {
      console.log(err);
      return { error: true };
    }
  };

  const updateActivity = async (activity: any): Promise<any> => {
    try {
      const result = await axios.put(
        `${API_URL}/user/${ADDRESS}/activities/${_.get(
          activity,
          'activity',
        )}/edit`,
        activity,
      );
      setActivities(_.get(result, 'data.activities'));
      const updatedActivity =
        result.data.activities[
          _.subtract(_.size(_.get(result, 'data.activities')), 1)
        ];
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

export const useUser = (): any => {
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
