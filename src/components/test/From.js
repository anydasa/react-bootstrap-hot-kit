import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash'
import axios from 'axios'
import { Modal, Button, FormControl, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap'
// import './Style.css';

const record = {
  code: '',
  name: '',
  color: '',
}

class From extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      record: _.isEmpty(this.props.record) ? record : this.props.record,
      errors: {},
      displayColorPicker: false
    }

    this.onSave = this.onSave.bind(this)
    this.onFocus = this.onFocus.bind(this)
    this.onChange = this.onChange.bind(this)
    this.handleChangeComplete = this.handleChangeComplete.bind(this)
    this.openColorPicker = this.openColorPicker.bind(this)
    this.closeColorPicker = this.closeColorPicker.bind(this)
  }

  openColorPicker() {
    this.setState({
      displayColorPicker: true,
      errors: {
        ...this.state.errors,
        color: ''
      }
    })
  }

  closeColorPicker() {
    this.setState({ displayColorPicker: false })
  }

  onFocus(e) {
    this.setState({
      errors: {
        ...this.state.errors,
        [e.target.name]: ''
      }
    })
  }

  onChange(e) {
    this.setState({
      record: {
        ...this.state.record,
        [e.target.name]: e.target.value
      }
    })
  }

  handleChangeComplete(color) {
    this.setState({
      record: {
        ...this.state.record,
        color: color.hex
      }
    });
  };

  onSave() {
    const url = this.props.record.id ? PUT_URL.replace('/0/', '/'+this.props.record.id+'/') : POST_URL
    const httpMethod = this.props.record.id ? 'put' : 'post'

    axios[httpMethod](url, this.state.record)
      .then(() => this.props.afterSubmit())
      .catch(r => {
        const errors = _.mapValues(r.response.data.error.form.children, item => {
          return item.errors ? item.errors.join(' ') : ''
        })
        this.setState({ errors })
      })
  }

  render() {
    const { record, displayColorPicker, errors } = this.state
    const { onClose } = this.props

    return (
      <Modal id="report-type-form" show={true} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <FormGroup className="required" validationState={errors.code ? 'error' : null}>
            <ControlLabel>Code</ControlLabel>
            <FormControl name="code" value={record.code} onChange={this.onChange} onFocus={this.onFocus} />
            {errors.code && <HelpBlock>{errors.code}</HelpBlock>}
          </FormGroup>

          <FormGroup className="required" validationState={errors.name ? 'error' : null}>
            <ControlLabel>Name</ControlLabel>
            <FormControl name="name" value={record.name} onChange={this.onChange} onFocus={this.onFocus} />
            {errors.name && <HelpBlock>{errors.name}</HelpBlock>}
          </FormGroup>

          <FormGroup className="required" validationState={errors.color ? 'error' : null}>
            <ControlLabel>Color</ControlLabel>
            <FormControl  name="color" value={record.color} onChange={this.onChange} onFocus={this.openColorPicker} />
            {errors.color && <HelpBlock>{errors.color}</HelpBlock>}

          </FormGroup>

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onClose}>Close</Button>
          <Button bsStyle="primary" onClick={this.onSave}>Save</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

From.propTypes = {
  onClose: PropTypes.func.isRequired,
  afterSubmit: PropTypes.func.isRequired,
  record: PropTypes.object.isRequired,
}

export default From