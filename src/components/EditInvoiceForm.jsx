import React from 'react';
import PropTypes from 'prop-types';
import RouterPropTypes from 'react-router-prop-types';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

import {
  Form,
  DatePicker,
  Input,
  Icon,
  Row,
  Col,
  message,
} from 'antd';

import Paper from './Paper';
import FormItemLabel from './FormItemLabel';
import SubmitButton from './SubmitButton';
import CancelButton from './CancelButton';

const FormItem = Form.Item;
const { TextArea } = Input;

class EditInvoiceForm extends React.Component {
  static propTypes = {
    editable: PropTypes.shape({
      comment: PropTypes.string,
      date_created: PropTypes.string,
      date_due: PropTypes.string,
      date_supply: PropTypes.string,
      number: PropTypes.number,
    }).isRequired,
    error: PropTypes.string,
    isUpdating: PropTypes.bool.isRequired,
    match: RouterPropTypes.match.isRequired,
    updateInvoice: PropTypes.func.isRequired,
  }

  static defaultProps = {
    error: null,
  }

  state = {
    redirectTo: null,
    dateDue: null,
    supplyDate: null,
  }

  componentDidMount() {
    // const { error } = this.props;
    console.log('edit form props', this.props);

    // if (error) {
    //   this.displayErrorMessage('delete');
    // }
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props;

    if (error && error !== prevProps.error) {
      this.displayErrorMessage('update');
    }
  }

  displayErrorMessage = (action) => {
    // const { resetInvoicesError } = this.props;

    message.error(`Failed to ${action} invoice. Maybe try again :P`);
    // message.error(
    //   `Failed to ${action} invoice. Maybe try again :P`,
    //   5,
    //   resetInvoicesError,
    // );
  }

  handleSubmit = (event) => {
    event.preventDefault();

    // TODO: prevent making request if invoice have not changed

    const {
      updateInvoice,
      // match: { params: { id } },
      match,
      editable,
      isUpdating,
    } = this.props;
    const { dateDue, supplyDate } = this.state;

    if (isUpdating) {
      return;
    }

    let id;

    if (match && editable) {
      ({ id } = match.params);
    }
    const invoice = {};
    const elems = event.target.elements;

    // invoice.id = id; // NOTE: include or not ???
    invoice.number = parseInt(elems.number.value, 10) || null;
    invoice.date_created = new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    invoice.date_due = dateDue || editable.date_due;
    invoice.date_supply = supplyDate || editable.date_supply;
    invoice.comment = elems.comment.value;

    console.log('editableInvoice', editable);

    updateInvoice(invoice, id).then((response) => {
      if (response) {
        this.setState({ redirectTo: '/' });
      } else {
        // this.displayErrorMessage('create');
      }
    });
  }

  handleDateChange(dateType) {
    return (momentObj) => {
      this.setState({
        [dateType]: momentObj.format('D MMMM YYYY'),
      });
    };
  }

  render() {
    const { isUpdating, editable } = this.props;
    const { redirectTo } = this.state;
    const dateDueMoment = moment(editable.date_due, 'D MMMM YYYY');
    const supplyDateMoment = moment(editable.date_supply, 'D MMMM YYYY');
    // console.log('dateDueMoment', dateDueMoment);
    // console.log('supplyDateMoment', supplyDateMoment);

    // TODO: Cant render on direct access to edit path, add ErrorBoundary?

    if (redirectTo) {
      return <Redirect to={redirectTo} />;
    }

    return (
      <form className="edit-invoice-form" onSubmit={this.handleSubmit}>
        <Paper className="edit-invoice-form__paper">
          <Row type="flex" gutter={16}>
            <Col xs={24} md={12}>

              <FormItem
                className="edit-invoice-form__item"
                label={<FormItemLabel labelText="Number" />}
              >
                <Input
                  name="number"
                  defaultValue={editable.number}
                  addonAfter={<Icon type="setting" />}
                />
              </FormItem>

            </Col>
            <Col xs={24} md={12}>

              <FormItem
                className="edit-invoice-form__item"
                label={<FormItemLabel labelText="Invoice Date" />}
              >
                <DatePicker
                  className="edit-invoice-form__date-picker"
                  defaultValue={dateDueMoment}
                  format="D MMMM YYYY"
                  placeholder="Select date"
                  onChange={this.handleDateChange('dateDue')}
                />
              </FormItem>

            </Col>
            <Col xs={24} md={12}>

              <FormItem
                className="edit-invoice-form__item"
                label={<FormItemLabel labelText="Supply Date" />}
              >
                <DatePicker
                  className="edit-invoice-form__date-picker"
                  defaultValue={supplyDateMoment}
                  format="D MMMM YYYY"
                  placeholder="Select date"
                  onChange={this.handleDateChange('supplyDate')}
                />
              </FormItem>

            </Col>
            <Col xs={24}>

              <FormItem
                className="edit-invoice-form__item"
                label={<FormItemLabel labelText="Comment" />}
              >
                <TextArea
                  name="comment"
                  autosize={{ minRows: 3 }}
                  defaultValue={editable.comment}
                />
              </FormItem>

            </Col>
          </Row>
        </Paper>
        <Row type="flex" justify="end">
          <Col>

            <SubmitButton
              isLoading={isUpdating}
              text={isUpdating ? 'Creating Invoice...' : 'Save'}
            />

            {!isUpdating && <CancelButton />}

          </Col>
        </Row>
      </form>
    );
  }
}

export default EditInvoiceForm;
