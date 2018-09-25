import React from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash.throttle';

import {
  Form,
  DatePicker,
  Input,
  Icon,
  Row,
  Col,
} from 'antd';

import Paper from './Paper';
import FormItemLabel from './FormItemLabel';
import SubmitButton from './SubmitButton';
import CancelButton from './CancelButton';

const FormItem = Form.Item;
const { TextArea } = Input;

class AddInvoiceForm extends React.Component {
  static propTypes = {
    createInvoice: PropTypes.func.isRequired,
    isCreating: PropTypes.bool.isRequired,
    validate: PropTypes.func,
    validation: PropTypes.shape({
      number: PropTypes.object,
      comment: PropTypes.object,
    }),
  }

  static defaultProps = {
    validate: null,
    validation: {},
  }

  state = {
    number: '',
    dateDue: null,
    supplyDate: null,
    comment: '',
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { createInvoice, isCreating, validate } = this.props;
    const { dateDue, supplyDate } = this.state;

    if (isCreating) {
      return;
    }

    const elems = event.target.elements;
    const number = elems.number.value.trim();
    const comment = elems.comment.value;

    if (validate && !validate({ number, comment })) {
      return;
    }

    const invoice = {
      number: Number(number),
      date_created: new Date().toLocaleDateString('en-GB', {
        day: 'numeric', month: 'long', year: 'numeric',
      }),
      date_due: dateDue,
      date_supply: supplyDate,
      comment,
    };
    console.log('created invoice: ', invoice);

    createInvoice(invoice);
  }

  handleChangeThrottled = (event) => {
    const { validate, validation } = this.props;
    const { name, value } = event.target;
    const { [name]: fieldValidation } = validation;

    this.setState({ [name]: value });
    // to provide onChange validation only after submit
    if (validate && fieldValidation && fieldValidation.status) {
      validate({ [name]: value.trim() });
    }
  }

  handleDateChange(dateType) {
    return (momentObj) => {
      this.setState({
        [dateType]: momentObj.format('D MMMM YYYY'),
      });
    };
  }

  render() {
    const { isCreating, validation } = this.props;
    const { number, comment } = this.state;
    const { number: numberValidity, comment: commentValidity } = validation;

    return (
      <form className="add-invoice-form" onSubmit={this.handleSubmit}>
        <Paper className="add-invoice-form__paper">
          <Row type="flex" gutter={16}>
            <Col xs={24} md={12}>

              <FormItem
                className="add-invoice-form__item"
                label={<FormItemLabel labelText="Number" />}
                help={numberValidity && numberValidity.help}
                validateStatus={numberValidity && numberValidity.status}
              >
                <Input
                  name="number"
                  maxLength="10"
                  // type="number"
                  addonAfter={<Icon type="setting" />}
                  value={number}
                  onChange={this.handleChangeThrottled}
                />
              </FormItem>

            </Col>
            <Col xs={24} md={12}>

              <FormItem
                className="add-invoice-form__item"
                label={<FormItemLabel labelText="Invoice Date" />}
              >
                {/* TODO: make it not less than current */}
                <DatePicker
                  className="add-invoice-form__date-picker"
                  format="D MMMM YYYY"
                  placeholder="Select date"
                  onChange={this.handleDateChange('dateDue')}
                />
              </FormItem>

            </Col>
            <Col xs={24} md={12}>

              <FormItem
                className="add-invoice-form__item"
                label={<FormItemLabel labelText="Supply Date" />}
              >
                {/* TODO: make it not less than current */}
                <DatePicker
                  className="add-invoice-form__date-picker"
                  format="D MMMM YYYY"
                  placeholder="Select date"
                  onChange={this.handleDateChange('supplyDate')}
                />
              </FormItem>

            </Col>
            <Col xs={24}>

              <FormItem
                className="add-invoice-form__item"
                label={<FormItemLabel labelText="Comment" />}
                help={commentValidity && commentValidity.help}
                validateStatus={commentValidity && commentValidity.status}
              >
                <TextArea
                  name="comment"
                  autosize={{ minRows: 3 }}
                  maxLength="160"
                  rows="3"
                  required
                />
              </FormItem>

            </Col>
          </Row>
        </Paper>
        <Row type="flex" justify="end">
          <Col>

            <SubmitButton
              isLoading={isCreating}
              text={isCreating ? 'Creating Invoice...' : 'Save'}
            />

            {!isCreating && <CancelButton />}

          </Col>
        </Row>
      </form>
    );
  }
}

export default AddInvoiceForm;
