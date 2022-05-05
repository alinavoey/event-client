import React, { Component } from 'react'
import { indexEvents } from '../../api/event'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../../index.scss'
import moment from 'moment'

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
        <Col key={event._id}>
          <Card border="secondary">
            <Card.Header>
              <Link
                className='event-link'
                to={'/sign-in'}>
                {event.title}
              </Link>
            </Card.Header>
            <Card.Body>
              <Card.Title>
                {event.location}
              </Card.Title>
              <Card.Subtitle>
                {moment(event.date).format('MMMM Do YYYY')} at {event.time}
              </Card.Subtitle>
              <Card.Text>
                {event.rsvps.length} people attending
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))
      // checking if userOnly prop is true
    } else if (userOnly) {
      // filtering events then mapping through the event where owner is equal to user id
      eventsJSX = events.filter(event => event.owner === user._id).map(event => (
        <Col key={event._id}>
          <Card border="secondary">
            <Card.Header>
              <Link
                className='event-link'
                to={`/events/${event._id}`}>
                {event.title}
              </Link>
            </Card.Header>
            <Card.Body>
              <Card.Title>
                {event.location}
              </Card.Title>
              <Card.Subtitle>
                {moment(event.date).format('MMMM Do YYYY')} at {event.time}
              </Card.Subtitle>
              <Card.Text>
                {event.rsvps.length} people attending
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))
      // checking if user has no events
      if (eventsJSX.length === 0) {
        eventsJSX = 'You have not created any events, create some so we can gather'
      }
      // mapping through events if userOnly is false
    } else {
      eventsJSX = events.map((event) => (
        <Col key={event._id}>
          <Card border="secondary">
            <Card.Header>
              <Link
                className='event-link'
                to={`/events/${event._id}`}>
                {event.title}
              </Link>
            </Card.Header>
            <Card.Body>
              <Card.Title>
                {event.location}
              </Card.Title>
              <Card.Subtitle>
                {moment(event.date).format('MMMM Do YYYY')} at {event.time}
              </Card.Subtitle>
              <Card.Text>
                {event.rsvps.length} people attending
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))
    }

    return (
      <>
        <div className='hero'><img className='hero-img' src={process.env.PUBLIC_URL + '/hero1.jpg'}/></div>
        <div className='main-content'>
          <h3 className='page-title'>{userOnly ? 'My Gatherings' : 'Current Gatherings'}</h3>
          <Row xs={1} md={3} className="g-4">
            {eventsJSX}
          </Row>
        </div>
      </>
    )
  }
}

export default IndexEvents
