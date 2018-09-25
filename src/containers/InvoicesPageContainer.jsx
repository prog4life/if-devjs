import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { message } from 'antd';

import * as actionCreators from 'actions';
import {
  getInvoicesList,
  getIsFetching,
  getDisplayInvoice,
  getDeleteInvoiceError,
  getFetchInvoicesError,
} from 'reducers';

import InvoicesPage from 'components/InvoicesPage';

class InvoicesPageContainer extends React.Component {
  static propTypes = {
    delError: PropTypes.string,
    displayInvoice: PropTypes.string,
    fetchError: PropTypes.string,
    fetchInvoices: PropTypes.func.isRequired,
    invoices: PropTypes.arrayOf(PropTypes.object).isRequired,
    isFetching: PropTypes.bool.isRequired,
    resetDisplayInvoice: PropTypes.func.isRequired,
  }

  static defaultProps = {
    delError: null,
    displayInvoice: null,
    fetchError: null,
  }

  componentDidMount() {
    const { fetchInvoices, resetDisplayInvoice } = this.props;

    resetDisplayInvoice();
    fetchInvoices();
  }

  componentDidUpdate(prevProps) {
    const { delError, fetchError } = this.props;

    if (delError && delError !== prevProps.delError) {
      message.error('Failed to delete invoice. Maybe try again :P');
      // message.error(
      //   `Failed to ${action} invoice. Maybe try again :P`,
      //   5,
      //   resetInvoicesError, // TODO:
      // );
    }
    if (fetchError && fetchError !== prevProps.fetchError) {
      message.error('Failed to load invoices. Maybe try to reload :P');
    }
  }

  componentWillUnmount() {
    // const { resetDisplayInvoice } = this.props;

    // resetDisplayInvoice(); // NOTE: looks like it is unnecessary
  }

  render() {
    const { invoices, isFetching, displayInvoice } = this.props;

    return (
      <InvoicesPage
        invoices={invoices}
        isFetching={isFetching}
        displayInvoice={displayInvoice}
      />
    );
  }
}

// TODO: rename displayInvoice to invoiceToDisplayId

const mapStateToProps = state => ({
  invoices: getInvoicesList(state),
  isFetching: getIsFetching(state),
  displayInvoice: getDisplayInvoice(state),
  delError: getDeleteInvoiceError(state),
  fetchError: getFetchInvoicesError(state),
});

const { fetchInvoices, resetDisplayInvoice } = actionCreators;

export default connect(mapStateToProps, {
  fetchInvoices,
  resetDisplayInvoice,
})(InvoicesPageContainer);
