import axios from 'axios'
import { mirrorRequest } from './refreshToken'

const Axios = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://lm-academy.com/api'
      : 'http://localhost:8000/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

Axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('lm-access-token')

  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token
  }

  return config
})

const REFRESH_ERROR_MESSAGE = 'Token has expired and can no longer be refreshed'

Axios.interceptors.response.use(
  function (response) {
    return response
  },
  async (error) => {
    const requestConfig = error.config

    const res = error.response
    const status = res.status
    const message = res.data.message

    console.log('error', error)
    console.log('message', message)

    if (status === 401) {
      if (message === 'Unauthrozied') {
        localStorage.removeItem('lm-access-token')
        window.location.href = '/login'
      }

      if (message == 'token expired') {
        return mirrorRequest(requestConfig)
      } else if (message == 'Your email or password is invalid') {
        localStorage.removeItem('lm-access-token')
        return Promise.reject(error)
      } else {
        localStorage.removeItem('lm-access-token')
        window.location.href = '/login'
      }
    }

    if (status == 500 && message == REFRESH_ERROR_MESSAGE) {
      localStorage.removeItem('lm-access-token')
      window.location.href = '/login'
    }
  },
)

export default Axios
