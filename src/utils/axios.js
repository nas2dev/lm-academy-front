import axios from 'axios'

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

export default Axios
