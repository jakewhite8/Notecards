import { useAppState } from '../context/GlobalState';

export default function authHeader() {
  const { state } = useAppState();
  const user = state.user

  if (user && user.token) {
    return { 'Authorization': user.token };
  }
  return {};
}
