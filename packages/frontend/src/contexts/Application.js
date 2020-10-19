import React, {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
import axios from 'axios';

const ACTIVITY_HISTORY = 'ACTIVITY_HISTORY';

const UPDATE_DB_DATA = 'UPDATE_DB_DATA';
const UPDATE_ACTIVITY_HISTORY = 'UPDATE_ACTIVITY_HISTORY';

const API_URL = process.env.REACT_APP_API_URL;
const ACCOUNT = process.env.REACT_APP_ACCOUNT;

const ApplicationContext = createContext();

function useApplicationContext() {
  return useContext(ApplicationContext);
}

function reducer(state, { type, payload }) {
  switch (type) {
    case UPDATE_DB_DATA: {
      const { account, accountStore } = payload;
      return {
        ...state,
        [account]: {
          ...state?.[account],
          accountStore: accountStore,
        },
      };
    }

    case UPDATE_ACTIVITY_HISTORY: {
      const { account, activityHistory } = payload;
      return {
        ...state,
        [account]: {
          ...state?.[account],
          [ACTIVITY_HISTORY]: activityHistory,
        },
      };
    }

    default: {
      throw Error(
        `Unexpected action type in ApplicationContext reducer: '${type}'.`
      );
    }
  }
}

export default function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, {});

  const updateAccountStore = useCallback((account, accountStore) => {
    dispatch({ type: UPDATE_DB_DATA, payload: { account, accountStore } });
  }, []);

  const updateActivityHistory = useCallback((account, activityHistory) => {
    dispatch({
      type: UPDATE_ACTIVITY_HISTORY,
      payload: { account, activityHistory },
    });
  }, []);

  return (
    <ApplicationContext.Provider
      value={useMemo(
        () => [
          state,
          {
            updateAccountStore,
            updateActivityHistory,
          },
        ],
        [state, updateAccountStore, updateActivityHistory]
      )}
    >
      {children}
    </ApplicationContext.Provider>
  );
}

export function Updater() {
  const [
    ,
    { updateAccountStore, updateActivityHistory },
  ] = useApplicationContext();

  // on account change, fetch all quests from firebase and save them in context
  useEffect(() => {
    async function getAccount(account) {
      try {
        const result = await axios.get(`${API_URL}/user/${account}`);
        updateAccountStore(account, result.data);
      } catch (err) {
        console.log('Error', err);
      }
    }
    getAccount(ACCOUNT);
  }, [updateAccountStore]);

  // on account change, fetch all quests from firebase and save them in context
  useEffect(() => {
    async function getActivityHistory(account) {
      try {
        const result = await axios.get(
          `${API_URL}/user/${account}/activities/history`
        );
        updateActivityHistory(account, result.data);
      } catch (err) {
        console.log('Error', err);
      }
    }
    getActivityHistory(ACCOUNT);
  }, [updateActivityHistory]);

  return null;
}

export function useUserDbData() {
  const [state] = useApplicationContext();
  const dbData = state?.[ACCOUNT]?.accountStore;
  return dbData;
}

export function useActivityHistory() {
  const [state] = useApplicationContext();
  const activityHistory = state?.[ACCOUNT]?.[ACTIVITY_HISTORY];
  return activityHistory;
}
