import apiUrl from '../apiConfig'
import axios from 'axios'

export const createEvent = (data, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/events',
    data: {
      event: data
    },
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
