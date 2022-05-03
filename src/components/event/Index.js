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

    if (events === null) {
      return 'Loading...'
    }

    let eventsJSX
    if (events.length === 0) {
      eventsJSX = 'No events, create some so we can gather'
    } else {
      eventsJSX = events.map(event => (
        <li key={event._id}>
          <Link to={`/events/${event._id}`}>{event.title}</Link>
        </li>
      ))
    }

    return (
      <>
        <h3>All the events:</h3>
        <ul>
          {eventsJSX}
        </ul>
      </>
    )
  }
}

export default IndexEvents
