import axios from 'axios';
import { NewUser } from '../types/DataTypes'
const API_URL = 'http://10.0.0.84:8080'


class AuthService {
  register(user: NewUser) {
    return axios.post(`${API_URL}/api/user/register`, user);
  }
}

export default new AuthService();
