import Axios from '../utils/axios'

async function fetchCurrentUser() {
  try {
    const res = await Axios.get('/auth/user-profile')

    return res.data
  } catch (error) {
    console.error('err', error)
  }
}

export default fetchCurrentUser
