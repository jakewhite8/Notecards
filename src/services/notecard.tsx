import axios from 'axios';
import { NewNotecardSet } from '../types/DataTypes';
import server from './serverURL';
import authHeader from '../services/auth-header'

class NotecardService {
  createNewSet(newNotecardSet: NewNotecardSet) {
    return axios.post(`${server.URL}/api/secured/create_notecard_set`, newNotecardSet, { 'headers' : authHeader() })
  }
}

export default new NotecardService();
