import axios from 'axios';
import { NewNotecardSet } from '../types/DataTypes';
import { User } from '../types/DataInterfaces';
import server from './serverURL';
import authHeader from '../services/auth-header'

class NotecardService {
  createNewSet(newNotecardSet: NewNotecardSet, user: User) {
    return axios.post(`${server.URL}/api/secured/create_notecard_set`, newNotecardSet, { 'headers' : authHeader(user.token) })
  }
  getNotecardSets(user: User) {
    return axios.get(`${server.URL}/api/secured/get_notecard_sets`, { 'headers' : authHeader(user.token) }) 
  }
}

export default new NotecardService();
