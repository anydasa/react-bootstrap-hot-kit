import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'
import { Modal, Button } from 'react-bootstrap'

class ConfirmDelete extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      record: this.props.record,
      errors: {},
    }

    this.onDelete = this.onDelete.bind(this)
  }

  onDelete() {
    const url = DELETE_URL.replace('/0/', '/' + this.props.record.id + '/')

    axios.delete(url)
      .then(() => this.props.afterSubmit())
      .catch(r => {
        console.log(r);
        this.setState({errors: r})
      })
  }

  render() {
    const {onClose} = this.props

    return (
      <Modal show={true} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Видалити тип звіту?</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <div className="text-center">
            Всі дані по даному етапу виборів буде видалено
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onClose}>Відхилити</Button>
          <Button bsStyle="danger" onClick={this.onDelete}>Підтверджую</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

ConfirmDelete.propTypes = {
  onClose: PropTypes.func.isRequired,
  afterSubmit: PropTypes.func.isRequired,
  record: PropTypes.object.isRequired,
}

export default ConfirmDelete