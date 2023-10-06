import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Define the state shape using TypeScript interfaces
interface AppState {
  user: User | null;
  // Other global state properties
}

interface User {
  id: number;
  name: string;
  // Other user properties
}

// Define the action types and their payloads
type AppAction =
  | { type: 'SET_USER'; payload: User }
  | { type: 'LOGOUT' }
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
  // Initialize other global state properties
};

// Reducer function
const appStateReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
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