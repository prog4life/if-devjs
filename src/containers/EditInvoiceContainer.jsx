import React from 'react';
import { connect } from 'react-redux';

import { updateInvoice, resetInvoicesError } from 'actions';

import { getIsUpdating, getInvoice, getUpdateInvoiceError } from 'reducers';

import EditInvoiceForm from 'components/EditInvoiceForm';

const mapStateToProps = (state, { match }) => ({
  isUpdating: getIsUpdating(state),
  editable: getInvoice(state, match.params.id),
  error: getUpdateInvoiceError(state),
});

export default connect(mapStateToProps, {
  updateInvoice,
  resetInvoicesError,
})(EditInvoiceForm);
