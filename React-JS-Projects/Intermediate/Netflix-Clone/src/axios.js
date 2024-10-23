import axios from 'axios'
import {baseUrl} from './Constants/Constants'

const instance = axios.create({
    baseURL: baseUrl,
  });

  export default instance