import React, {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
import axios from 'axios';

const UPDATE_DB_DATA = 'UPDATE_DB_DATA';

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

  return (
    <ApplicationContext.Provider
      value={useMemo(
        () => [
          state,
          {
            updateAccountStore,
          },
        ],
        [state, updateAccountStore]
      )}
    >
      {children}
    </ApplicationContext.Provider>
  );
}

export function Updater() {
  const [, { updateAccountStore }] = useApplicationContext();

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

  return null;
}

export function useUserDbData() {
  const [state] = useApplicationContext();
  const dbData = state?.[ACCOUNT]?.accountStore;
  return dbData;
}
