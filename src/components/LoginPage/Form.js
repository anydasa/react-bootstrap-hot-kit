import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { Form, FormGroup, FormControl, ControlLabel, HelpBlock, Button, Alert } from 'react-bootstrap';
import { login, fetchMineInfo } from 'actions/auth';

class LoginForm extends React.Component {

  constructor(props) {
    super(props);



    this.state = {
      username: '',
      password: '',
      errors: {},
      submitting: false,
    }

    this.onFocus = this.onFocus.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  async onSubmit(e) {
    e.preventDefault()

    this.setState({ submitting: true })

    try {
      await this.props.login(this.state.username, this.state.password)
      await this.props.fetchMineInfo()
      browserHistory.push('/')
    } catch (errors) {
      this.setState({ submitting: false, errors })
    }
  }

  onFocus() {
    this.setState({ errors: {} })
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { username, password, errors, submitting } = this.state

    return (
      <Form onSubmit={this.onSubmit}>

        {errors.error_description && <Alert bsStyle="danger">{errors.error_description}</Alert>}

        <FormGroup validationState={errors.username ? 'error' : null}>
          <ControlLabel>Username</ControlLabel>
            <FormControl name="username" value={username} onChange={this.onChange} onFocus={this.onFocus}/>
            {errors.username && <HelpBlock>{errors.username}</HelpBlock>}
        </FormGroup>

        <FormGroup validationState={errors.password ? 'error' : null}>
          <ControlLabel>Username</ControlLabel>
          <FormControl type="password" name="password" value={password} onChange={this.onChange} onFocus={this.onFocus}/>
          {errors.password && <HelpBlock>{errors.password}</HelpBlock>}
        </FormGroup>

        <Button bsStyle="success" type="submit">
          {submitting && <i className="fa fa-spinner fa-spin" />} Login
        </Button>

      </Form>
    );
  }
}

export default connect(null, { login, fetchMineInfo })(LoginForm);