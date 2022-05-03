import apiUrl from '../apiConfig'
import axios from 'axios'

export const indexEvents = user => {
  return axios({
    method: 'GET',
    url: apiUrl + '/events'
    // headers: {
    //   Authorization: `Bearer ${user.token}`
    // }
  })
}
