import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { User } from '../types/DataInterfaces'

// Define the state shape using TypeScript interfaces
interface AppState {
  user: User | null;
  newNotecardSet: NewNotecardSet | {title: '', notecards: [] };
  currentNotecardSet: NotecardSet | {title: '', id: null, notecards: [] };
  // Other global state properties
}

interface NotecardSet {
  title: string;
  id: number | null;
  notecards: Array<[string, string]>;
}

interface NewNotecardSet {
  title: string;
  notecards: Array<[string, string]>;
}

// Define the action types and their payloads
type AppAction =
  | { type: 'SET_USER'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_NEW_NOTECARDSET'; payload: NotecardSet }
  | { type: 'RESET_NEW_NOTECARDSET'; }
  | { type: 'UPDATE_CURRENT_NOTECARDSET'; payload: NotecardSet }
  // Add more action types as needed

interface AppStateContextTypes {
  state: AppState
  dispatch: React.Dispatch<AppAction>;
}

// Create the context and set the inital value to undefined
const AppStateContext = createContext<AppStateContextTypes | undefined>(undefined);

// Initial state
const initialState: AppState = {
  user: null,
  newNotecardSet: {
    title: '',
    notecards: []
  },
  currentNotecardSet: {
    title: '',
    id: null,
    notecards: []
  }
  // Initialize other global state properties
};

// Reducer function
const appStateReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'UPDATE_NEW_NOTECARDSET':
      return {...state, newNotecardSet: action.payload };
    case 'RESET_NEW_NOTECARDSET':
      return {...state, newNotecardSet: {title: '', notecards: [] }};
    case 'UPDATE_CURRENT_NOTECARDSET':
      return {...state, currentNotecardSet: action.payload };
    // Handle other state updates
    default:
      return state;
  }
};

// Provider component
export const AppStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appStateReducer, initialState);

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
};

// Custom hook to access the state and dispatch
export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};