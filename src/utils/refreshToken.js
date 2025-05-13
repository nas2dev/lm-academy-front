import { useUserStore } from '@/stores/useUserStore'
import Axios from './axios'

async function refreshToken() {
  try {
    const request = await Axios.post('/auth/refresh')

    const userStore = useUserStore()

    const token = request.data.access_token

    localStorage.setItem('lm-access-token', token)

    userStore.user = request.data.user

    return token
  } catch (error) {
    return null
  }
}

async function mirrorRequest(config) {
  const newToken = await refreshToken()
  if (!newToken) {
    return
  }
  config.headers['Authorization'] = 'Bearer ' + newToken

  return Axios(config)
}

export { refreshToken, mirrorRequest }
