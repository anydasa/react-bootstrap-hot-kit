import React, {Component} from 'react';
import _ from 'lodash';
import axios from 'axios';
import { Table, Badge, MenuItem, DropdownButton, Button, Row, Col } from 'react-bootstrap';
import ConfirmDelete from './ConfirmDelete';
import Form from './From';
import './Style.scss'

class List extends Component {

  constructor(props) {
    super(props);

    this.state = {
      list: {},
      modalComponent: null
    }

    this.onClose = this.onClose.bind(this)
    this.onConfirm = this.onConfirm.bind(this)
    this.afterSave = this.afterSave.bind(this)
  }

  componentWillMount() {
    this.fetchList()
  }

  fetchList() {

    /*axios.get(REPORT_TYPE_LIST_URL).then(res => {
      let sortedList = _.sortBy(res.data, item => item.order)
      this.setState({list: sortedList})
    })*/
  }

  afterSave() {
    this.fetchList()
    this.setState({ modalComponent: null })
  }

  openEditForm(item) {
    const modalComponent = <Form onClose={this.onClose} afterSubmit={this.afterSave} record={item}/>
    this.setState({ modalComponent })
  }

  openConfirmDelete(item) {
    const modalComponent = <ConfirmDelete onClose={this.onClose} afterSubmit={this.afterSave} record={item} />
    this.setState({ modalComponent })
  }

  move(id, toUp) {
    let list = this.state.list

    const from = _.toInteger(_.findKey(list, ['id', id]))
    const to = toUp ? from - 1 : from + 1;

    if (_.isUndefined(list[to])) {
      return
    }

    list.splice(from, 0, list.splice(to, 1)[0]);

    const ordered = _.map(list, value => value.id)

    /*axios.put(PUT_ORDER_URL, { ordered }).then(res => {
      let sortedList = _.sortBy(res.data, item => item.order)
      this.setState({list: sortedList})
    })*/
  }

  onConfirm() {
    this.setState({ modalComponent: null })
  }

  onClose() {
    this.setState({ modalComponent: null })
  }

  render() {
    const { list, modalComponent } = this.state
    const firstKey = _.toInteger(_.findKey(list))
    const lastKey = _.toInteger(_.findLastKey(list))

    return (
      <Row>
        <Col xs={8}>
          <Button className="pull-right green add" bsSize="sm" onClick={this.openEditForm.bind(this, {})}>
            <i className="fa fa-plus"/> Add
          </Button>
          <br/>
          <br/>
          <Table hover>
            <tbody>
            {_.map(list, (item, key) => (
              <tr key={item.id}>
                <td>
                  <DropdownButton bsSize="sm" noCaret title={<i className="fa fa-ellipsis-v" />} id={'dropdown-basic-1'}>
                    <MenuItem onClick={this.openEditForm.bind(this, item)}>
                      <i className="fa fa-pencil"/> Edit
                    </MenuItem>
                    <MenuItem onClick={this.openConfirmDelete.bind(this, item)}>
                      <i className="fa fa-times"/> Delete
                    </MenuItem>
                  </DropdownButton>
                </td>
                <td>
                  <Badge bsStyle="info">{item.code}</Badge>
                </td>
                <td>
                  <Badge style={{ backgroundColor: item.color }}>&nbsp;</Badge>
                </td>
                <td>{item.name}</td>
                <td>
                  <div style={{width: 55}}>
                    {key !== firstKey &&
                      <Button bsSize="sm" bsStyle="info" className="pull-left" onClick={this.move.bind(this, item.id, true)}>
                        <i className="fa fa-long-arrow-up"/>
                      </Button>
                    }
                    {key !== lastKey &&
                      <Button bsSize="sm" bsStyle="info" className="pull-right" onClick={this.move.bind(this, item.id, false)}>
                        <i className="fa fa-long-arrow-down"/>
                      </Button>
                    }
                  </div>
                </td>

              </tr>
            ))}
            </tbody>
          </Table>

          { modalComponent }
        </Col>
      </Row>
    );
  }
}




export default List;