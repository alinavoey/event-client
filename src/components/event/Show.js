import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { deleteEvent, showEvent, rsvpEvent } from '../../api/event'
import Button from 'react-bootstrap/Button'
import moment from 'moment'

class ShowEvent extends Component {
  constructor (props) {
    super(props)

    this.state = {
      event: null
    }
  }

  componentDidMount () {
    const { match, user, msgAlert } = this.props

    showEvent(match.params.id, user)
      .then(res => this.setState({ event: res.data.event }))
      .catch(error => {
        msgAlert({
          heading: 'Show event failed',
          message: 'Error message: ' + error.message,
          variant: 'danger'
        })
      })
  }

  handleDelete = () => {
    const { match, user, msgAlert, history } = this.props

    deleteEvent(match.params.id, user)
      .then(() => history.push('/'))
      .then(() => {
        msgAlert({
          heading: 'Event deleted',
          message: 'Yippe! Event deleted!',
          variant: 'success'
        })
      })
      .catch(error => {
        msgAlert({
          heading: 'Event deletion failed',
          message: 'Event Delete Error: ' + error.message,
          variant: 'danger'
        })
      })
  }

  handleRsvp = () => {
    const { match, user, msgAlert } = this.props
    const { rsvps } = this.state.event

    console.log(user)

    let isRsvp = false // setting initial rsvpStatus to false

    // filtering through rsvps and grabbing only the rsvp that belongs to the user
    const myRsvp = rsvps.filter(rsvp => rsvp.user._id === user._id).pop()

    // checking if myRsvp is defined (if the user has already rsvpd)
    if (myRsvp) {
      // then setting isRsvp to the users rsvpStatus (setting it to true)
      isRsvp = myRsvp.rsvpStatus
    }

    // checking if rsvp is false then make an api call
    if (!isRsvp) {
      rsvpEvent(match.params.id, user, true)
        .then(() => this.componentDidMount())
        .then(() => {
          msgAlert({
            heading: 'Event rsvp success',
            message: 'Yippie! Success!',
            variant: 'success'
          })
        })
        .catch(error => {
          msgAlert({
            heading: 'Event rsvp failed',
            message: 'Event rsvp Error: ' + error.message,
            variant: 'danger'
          })
        })
    } else {
      msgAlert({
        heading: 'Oops!',
        message: 'Looks like you are already rsvpd',
        variant: 'warning'
      })
    }
  }

  render () {
    if (this.state.event === null) {
      return 'loading...'
    }
    //  add owner back in
    const { title, location, date, time, description, owner, rsvps } = this.state.event
    const { user, history, match } = this.props
    const rsvpJSX = rsvps.map(rsvp => (
      <li key={rsvp._id}>{rsvp.user.email}</li>
    ))

    return (
      <>
        <h3 className='event-title'>{title}</h3>
        <div className='event-details'>
          <h6 className='event-details-title'>Where:</h6>
          <p className='event-details-info'> {location}</p>
          <h6 className='event-details-title'>When:</h6>
          <p className='event-details-info'>{moment(date).utc().format('LL')} at {time}</p>
          <h6 className='event-details-title'>Desciption:</h6>
          <p className='event-details-info'>{description}</p>
          <h6 className='event-details-title'>RSVP:</h6>
          {rsvpJSX}
          {user._id === owner && (
            <>
              <Button onClick={this.handleDelete}>Delete</Button>
              <Button onClick={() => history.push(`/events/${match.params.id}/update-event`)}>Update</Button>
            </>
          )}
          {/* This button allow anyone to rsvp to an event */}
          <Button onClick={this.handleRsvp}>RSVP</Button>
        </div>
      </>
    )
  }
}

// component MUST be wrapped to use withRouter
export default withRouter(ShowEvent)
