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
export const showEvent = (id, user) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/events/' + id,
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
export const deleteEvent = (id, user) => {
  return axios({
    method: 'DELETE',
    url: apiUrl + '/events/' + id,
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const updateEvent = (data, id, user) => {
  return axios({
    method: 'PATCH',
    url: apiUrl + '/events/' + id,
    data: {
      event: {
        title: data.title,
        location: data.location,
        date: data.date,
        time: data.time,
        description: data.description

      }
    },
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const rsvpEvent = (id, user, rsvp) => {
  return axios({
    method: 'PATCH',
    url: apiUrl + '/rsvp/' + id,
    data: {
      rsvps: {
        user: user._id,
        rsvpStatus: rsvp
      }
    },
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
