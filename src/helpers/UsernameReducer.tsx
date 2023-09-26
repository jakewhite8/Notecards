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

// added null in the create context so that tsc issues are fixed. Refer https://stackoverflow.com/questions/54577865/react-createcontext-issue-in-typescript/54667477
export const UsernameReducerContext = createContext({
  UsernameState: { username: 'jake' }
});
