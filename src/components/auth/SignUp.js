import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signUp, signIn } from '../../api/auth'
import { signUpSuccess, signUpFailure } from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class SignUp extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      passwordConfirmation: ''
    }
  }

handleChange = (event) =>
  this.setState({
    [event.target.name]: event.target.value
  })

onSignUp = (event) => {
  event.preventDefault()

  const { msgAlert, history, setUser } = this.props

  signUp(this.state)
    .then(() => signIn(this.state))
    .then((res) => setUser(res.data.user))
    .then(() =>
      msgAlert({
        heading: 'Sign Up Success',
        message: signUpSuccess,
        variant: 'success'
      })
    )
    .then(() => history.push('/'))
    .catch((error) => {
      this.setState({ email: '', firstName: '', lastName: '', password: '', passwordConfirmation: '' })
      msgAlert({
        heading: 'Sign Up Failed with error: ' + error.message,
        message: signUpFailure,
        variant: 'danger'
      })
    })
}

render () {
  const { email, password, passwordConfirmation, firstName, lastName } = this.state

  return (
    <div className='row'>
      <div className='col-sm-10 col-md-8 mx-auto mt-5'>
        <h3 className='page-title'>Sign Up</h3>
        <Form onSubmit={this.onSignUp}>
          <Form.Group controlId='firstName'>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              required
              type='text'
              name='firstName'
              value={firstName}
              placeholder='First Name'
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId='lastName'>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              required
              type='text'
              name='lastName'
              value={lastName}
              placeholder='Last Name'
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              required
              type='email'
              name='email'
              value={email}
              placeholder='Enter email'
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              name='password'
              value={password}
              type='password'
              placeholder='Password'
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId='passwordConfirmation'>
            <Form.Label>Password Confirmation</Form.Label>
            <Form.Control
              required
              name='passwordConfirmation'
              value={passwordConfirmation}
              type='password'
              placeholder='Confirm Password'
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button variant='primary' type='submit'>Submit</Button>
        </Form>
      </div>
    </div>
  )
}
}

export default withRouter(SignUp)
