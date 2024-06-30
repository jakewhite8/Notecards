import axios from 'axios';
import { NewNotecardSet } from '../types/DataTypes';
import { User } from '../types/DataInterfaces';
import server from './serverURL';
import authHeader from '../services/auth-header'

class NotecardService {
  // Create new Notecard set
  createNewSet(newNotecardSet: NewNotecardSet, user: User) {
    return axios.post(`${server.URL}/api/secured/create_notecard_set`, newNotecardSet, { 'headers' : authHeader(user.token) })
  }
  // Send Notecard Set Id to sever to be deleted
  deleteNotecard(user: User, notecardId: number) {
    return axios.delete(`${server.URL}/api/secured/delete_notecard_set/${notecardId}`, { 'headers' : authHeader(user.token) })
  }
  // Get all Notecard set information for the logged in User
  getNotecardSets(user: User) {
    return axios.get(`${server.URL}/api/secured/get_notecard_sets`, { 'headers' : authHeader(user.token) }) 
  }
  // Get all Notecards within the specified Notecard set
  getNotecards(user: User, notecardId: number) {
    return axios.get(`${server.URL}/api/secured/get_notecards/${notecardId}`, { 'headers' : authHeader(user.token) })
  }
}

export default new NotecardService();
