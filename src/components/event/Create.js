import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

// import { withRouter } from 'react-router-dom'

// import EventForm from '../shared/EventForm'

import { createEvent } from '../../api/event'

class CreateEvent extends Component {
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

  handleChange = (event) => {
    // The event.target of this event will be an input element
    // Which will have a `name` attribute (key in the state) & a `value` (what the user typed)
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    // add history below to do the push
    const { user, msgAlert } = this.props

    createEvent(this.state, user)
      // .then(res => history.push('/events/' + res.data.event._id))
      .then(() => msgAlert({ heading: 'Event Created!', message: 'Party Time!', variant: 'success' }))
      .catch(err => {
        msgAlert({
          heading: 'Event creation failed :(',
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
// add withRouter() when doing the history push above
export default CreateEvent
