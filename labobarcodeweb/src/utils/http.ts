import axios, { AxiosInstance } from 'axios'
const API_URL = process.env.REACT_APP_API_URL;
class Http {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: API_URL,
      timeout: 10000,
      withCredentials: true, 
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
      }
    })
  }
}

const http = new Http().instance

export default http