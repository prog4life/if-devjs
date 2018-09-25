import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { message } from 'antd';

import { createInvoice, fetchInvoices, resetInvoicesError } from 'actions';
import {
  getIsCreating, getCreateInvoiceError, getInvoiceNumbers,
} from 'reducers';

import AddInvoiceForm from 'components/AddInvoiceForm';

class AddInvoiceContainer extends React.Component {
  static propTypes = {
    createInvoice: PropTypes.func.isRequired,
    error: PropTypes.string,
    fetchInvoices: PropTypes.func.isRequired,
    invoiceNumbers: PropTypes.arrayOf(PropTypes.number).isRequired,
  }

  static defaultProps = {
    error: null,
  }

  state = {
    redirectTo: null,
    validation: {
      number: { status: null, help: null },
      comment: { status: null, help: null },
    },
  }

  componentDidMount() {
    const { fetchInvoices: fetchInvoicesOnMount } = this.props;
    fetchInvoicesOnMount();
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props;

    if (error && error !== prevProps.error) {
      message.error('Failed to create invoice. Maybe try again :P');
      // message.error(
      //   `Failed to ${action} invoice. Maybe try again :P`,
      //   5,
      //   resetInvoicesError,
      // );
    }
  }

  createInvoiceOnSubmit = (invoice) => {
    const { createInvoice: create } = this.props;

    create(invoice).then((response) => {
      // TODO: prevent calling setState after unmounting
      if (response) {
        this.setState({ redirectTo: '/' });
      } else {
        // this.displayErrorMessage('create');
      }
    });
  }

  validateFields = ({ number, comment }) => {
    const { invoiceNumbers } = this.props;
    const num = Number(number);
    const numberResult = { status: 'error', help: null };
    const commentResult = { status: 'error', help: null };
    let result = false;

    if (number.length < 4 || number.length > 10 || !Number.isInteger(num)) {
      numberResult.help = 'Should be integer number from 4 to 10 digits';
    } else if (invoiceNumbers.includes(num)) {
      numberResult.help = 'Number is already in use. Choose another one please';
    } else {
      numberResult.status = 'success';
      result = true;
    }
    commentResult.status = 'success'; // TEMP

    this.setState({
      validation: { number: numberResult, comment: commentResult },
    });
    return result;
  }

  render() {
    const { redirectTo, validation } = this.state;

    if (redirectTo) {
      return <Redirect to={redirectTo} />;
    }
    return (
      <AddInvoiceForm
        {...this.props}
        createInvoice={this.createInvoiceOnSubmit}
        // validate={this.validateFields}
        // validation={validation}
      />
    );
  }
}

const mapStateToProps = state => ({
  isCreating: getIsCreating(state),
  error: getCreateInvoiceError(state),
  invoiceNumbers: getInvoiceNumbers(state),
});

export default connect(mapStateToProps, {
  createInvoice,
  fetchInvoices,
  resetInvoicesError,
})(AddInvoiceContainer);
