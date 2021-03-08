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
  const [userData, setUserData] = useState(null);
  const [activityHistory, setActivityHistory] = useState([]);
  const [activities, setActivities] = useState([]);

  const getActivityHistory = () => {
    axios.get(`${API_URL}/user/${ADDRESS}/activities/history`).then((res) => {
      setActivityHistory(res.data);
    });
  };

  const getActivities = () => {
    axios.get(`${API_URL}/user/${ADDRESS}/activities`).then((res) => {
      setActivities(res.data);
    });
  };

  const getUser = () => {
    axios.get(`${API_URL}/user/${ADDRESS}`).then((res) => {
      setUserData(res.data);
    });
  };

  useEffect(() => {
    getUser();
    getActivityHistory();
    getActivities();
  }, []);

  const recordActivity = async (activity) => {
    await axios.post(`${API_URL}/user/${ADDRESS}/activities/${activity}`).then((res) => {
      getActivityHistory();
    });
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        activityHistory,
        activities,
        recordActivity,
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
  } = useContext(UserContext);
  return {
    userData,
    activityHistory,
    activities,
    recordActivity,
  };
};
