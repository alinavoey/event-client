import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { deleteEvent, showEvent } from '../../api/event'
import Button from 'react-bootstrap/Button'

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
      .then(() => {
        msgAlert({
          heading: 'Show event success',
          message: 'Yippie! Success!',
          variant: 'success'
        })
      })
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

  render () {
    if (this.state.event === null) {
      return 'loading...'
    }
    //  add owner back in
    const { title, location, date, time, description, owner } = this.state.event
    const { user, history, match } = this.props
    return (
      <>
        <h3>Show an event</h3>
        <h4>{title}</h4>
        <p>Location: {location}</p>
        <p>Date: {date}</p>
        <p>Time: {time}</p>
        <p>Description: {description}</p>
        {user._id === owner && (
          <>
            <Button onClick={this.handleDelete}>Delete</Button>
            <Button onClick={() => history.push(`/events/${match.params.id}/edit`)}>Update</Button>
          </>
        )}
      </>
    )
  }
}

// component MUST be wrapped to use withRouter
export default withRouter(ShowEvent)
