import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
// API request
import { updateEvent, showEvent } from '../../api/event'
// import MovieForm from '../shared/MovieForm'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

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

  // handleChange = (event) => {
  //   // because `this.state.movie` is an object with multiple keys, we have to do some fancy updating
  //   const userInput = { [event.target.name]: event.target.value }
  //   this.setState(currState => {
  //     // "Spread" out current movie state key/value pairs, then add the new one at the end
  //     // this will override the old key/value pair in the state but leave the others untouched
  //     return { event: { ...currState.event, ...userInput } }
  //   })
  // }
  handleChange = (event) =>
    this.setState({
      [event.target.name]: event.target.value
    })

    handleSubmit = (event) => {
      event.preventDefault()

      const { user, msgAlert, history, match } = this.props

      updateEvent(this.state, match.params.id, user)
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
        <>
          <div className='form-box'>
            <div className='row'>
              <div className='col-sm-10 col-md-8 mx-auto mt-5'>
                <h3 className='page-title'>Update Event</h3>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId='title'>
                    <Form.Label>Event Title</Form.Label>
                    <Form.Control
                      required
                      name='title'
                      value={this.state.title}
                      placeholder={this.state.event?.title}
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Form.Group controlId='location'>
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      required
                      name='location'
                      value={this.state.location}
                      placeholder={this.state.event?.location}
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
                      placeholder={this.state.event?.date}
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Form.Group controlId='time'>
                    <Form.Label>Time</Form.Label>
                    <Form.Control
                      required
                      name='time'
                      value={this.state.time}
                      placeholder={this.state.event?.time}
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Form.Group controlId='description'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      required
                      name='description'
                      value={this.state.description}
                      placeholder={this.state.event?.description}
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Button type='submit'>Submit</Button>
                </Form>
              </div>
            </div>
          </div>
        </>
      )
    }
}

export default withRouter(UpdateEvent)
