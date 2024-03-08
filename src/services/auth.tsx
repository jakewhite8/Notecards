import axios from 'axios';
import { NewUser } from '../types/DataTypes';
import server from './serverURL';

class AuthService {
  register(user: NewUser) {
    return axios.post(`${server.URL}/api/user/register`, user);
  }
}

export default new AuthService();
