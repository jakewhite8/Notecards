import { createContext } from 'react';

export const initialState = { username: 'jake' };
export function UsernameReducer(
  state: { username: string },
  action: { type: string; payload: string }
) {
  const { payload } = action;
  switch (action.type) {
    case 'set-username':
      return { ...state, username: payload };
    default:
      return state;
  }
}

export const UsernameReducerContext = createContext({
  UsernameState: { username: 'jake' }
});
