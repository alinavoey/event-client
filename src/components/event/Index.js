import React, { Component } from 'react'
import { indexEvents } from '../../api/event'
import { Link } from 'react-router-dom'

class IndexEvents extends Component {
  constructor (props) {
    super(props)

    this.state = {
      events: null
    }
  }

  componentDidMount () {
    const { user, msgAlert } = this.props

    indexEvents(user)
      .then((res) => this.setState({ events: res.data.events }))
      .then(() => {
        msgAlert({
          heading: 'Index Success',
          message: 'Yippie indexed!',
          variant: 'success'
        })
      })
      .catch(error => {
        msgAlert({
          heading: 'Index Failed',
          message: 'Index Error: ' + error.message,
          variant: 'danger'
        })
      })
  }

  render () {
    const { events } = this.state
    const { userOnly, user } = this.props

    if (events === null) {
      return 'Loading...'
    }

    let eventsJSX
    // checking if there are no events in the entire app
    if (events.length === 0) {
      eventsJSX = 'No events, create some so we can gather'
      // checking if user is not logged-in
    } if (user === null) {
      eventsJSX = events.map((event) => (
        <li key={event._id}>
          <h6>{event.title}</h6>
          <Link to={'/sign-in'}>
            The {event.title} is happening at {event.location} on {event.date} hosted by {event.owner}
          </Link>
        </li>
      ))
      // checking if userOnly prop is true
    } else if (userOnly) {
      // filtering events then mapping through the event where owner is equal to user id
      eventsJSX = events.filter(event => event.owner === user._id).map(event => (
        <li key={event._id}>
          <Link to={`/events/${event._id}`}>{event.title}</Link>
        </li>
      ))
      // checking if user has no events
      if (eventsJSX.length === 0) {
        eventsJSX = 'You have not created any events, create some so we can gather'
      }
      // mapping through events if userOnly is false
    } else {
      eventsJSX = events.map((event) => (
        <li key={event._id}>
          <Link
            to={`/events/${event._id}`}>
            {event.title}
          </Link>
        </li>
      ))
    }

    return (
      <>
        <h3>{userOnly ? 'My events:' : 'All the events:'}</h3>
        <ul>
          {eventsJSX}
        </ul>
      </>
    )
  }
}

export default IndexEvents
