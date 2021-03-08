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

  useEffect(() => {
    axios.get(`${API_URL}/user/${ADDRESS}/activities/history`).then((res) => {
      setActivityHistory(res.data);
    });

    axios.get(`${API_URL}/user/${ADDRESS}/activities`).then((res) => {
      setActivities(res.data);
    });

    axios.get(`${API_URL}/user/${ADDRESS}`).then((res) => {
      setUserData(res.data);
    });
  }, []);

  return (
    <UserContext.Provider
      value={{
        userData,
        activityHistory,
        activities,
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
  } = useContext(UserContext);
  return {
    userData,
    activityHistory,
    activities,
  };
};
