import axios from 'axios';
import { LoginCredentials, NewUser } from '../types/DataTypes';
import server from './serverURL';
import authHeader from './auth-header'

class AuthService {

  login(user: LoginCredentials) {
    return axios.post(`${server.URL}/api/token`, user)
  }

  register(user: NewUser) {
    return axios.post(`${server.URL}/api/user/register`, user);
  }

  validToken(token: string) {
   return axios.get(`${server.URL}/api/secured/ping`, { 'headers' : authHeader(token) });
  }
}

export default new AuthService();
