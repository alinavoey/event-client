import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
// API request
import { updateEvent, showEvent } from '../../api/event'
// import MovieForm from '../shared/MovieForm'

class UpdateEvent extends Component {
  constructor (props) {
    super(props)

    this.state = {
        title: '',
        location: '',
        date: '',
        time: '',
        description: '',
        owner: ''
      }
    }

  componentDidMount () {
    // one of the automatic router props we get is the match object - that has data about the params in our front-end route url
    const { match, user, msgAlert } = this.props

    showEvent(match.params.id, user)
      .then(res => this.setState({ event: res.data.event }))
      .then(() => msgAlert({
        heading: 'Show event success',
        message: 'Check out the event',
        variant: 'success'
      }))
      .catch(err => msgAlert({
        heading: 'Show event failed :(',
        message: 'Something went wrong: ' + err.message,
        variant: 'danger'
      }))
  }

    handleChange = (event) => {
      // because `this.state.movie` is an object with multiple keys, we have to do some fancy updating
      const userInput = { [event.target.name]: event.target.value }
      this.setState(currState => {
        // "Spread" out current movie state key/value pairs, then add the new one at the end
        // this will override the old key/value pair in the state but leave the others untouched
        return { event: { ...currState.event, ...userInput } }
      })
    }

    handleSubmit = (event) => {
      event.preventDefault()

      const { user, msgAlert, history, match } = this.props

      updateEvent(this.state.event, match.params.id, user)
        .then(res => history.push('/events/' + match.params.id))
        .then(() => msgAlert({ heading: 'Event Updated!', message: 'Nice work, go check out your event.', variant: 'success' }))
        .catch(err => {
          msgAlert({
            heading: 'Event update failed :(',
            message: 'Something went wrong: ' + err.message,
            variant: 'danger'
          })
        })
    }

    render () {
      return (
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId='title'>
            <Form.Label>Event Title</Form.Label>
            <Form.Control
              required
              name='title'
              value={this.state.title}
              placeholder='Event title'
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId='location'>
            <Form.Label>Location</Form.Label>
            <Form.Control
              required
              name='location'
              value={this.state.location}
              placeholder='Event Location'
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId='date'>
            <Form.Label>Date</Form.Label>
            <Form.Control
              required
              name='date'
              type='date'
              value={this.state.date}
              placeholder='Event Date'
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId='time'>
            <Form.Label>Time</Form.Label>
            <Form.Control
              required
              name='time'
              value={this.state.time}
              placeholder='Event Time'
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId='description'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              required
              name='description'
              value={this.state.description}
              placeholder='Event Description'
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button type='submit'>Submit</Button>
        </Form>
      )
    }
  }

export default withRouter(UpdateEvent)