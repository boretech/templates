import axios from 'axios'
import qs from 'qs'

export const request = axios.create({
  withCredentials: true
})

request.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    config.data = qs.stringify(config.data)
  } else {
    config.headers['Content-Type'] = 'application/json'
  }
}, err => {
  Promise.reject(err)
})

request.interceptors.response.use(res => {
  return res.data
}, err => {
  Promise.reject(err)
})
