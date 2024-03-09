import axios from 'axios';
import { LoginCredentials, NewUser } from '../types/DataTypes';
import server from './serverURL';

class AuthService {

  login(user: LoginCredentials) {
    return axios.post(`${server.URL}/api/token`, user)
  }

  register(user: NewUser) {
    return axios.post(`${server.URL}/api/user/register`, user);
  }
}

export default new AuthService();
