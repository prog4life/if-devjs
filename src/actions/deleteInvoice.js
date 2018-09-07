import axios from 'axios';
import * as aT from 'constants/actionTypes';
import { getIsInvoiceRemoving } from 'reducers';
import { makeActionCreator } from 'utils/makeActionCreator';

const makeAC = makeActionCreator;

export const deleteInvoiceRequest = makeAC(aT.DELETE_INVOICE_REQUEST, 'id');
export const deleteInvoiceSuccess = makeAC(aT.DELETE_INVOICE_SUCCESS, 'id');

export const deleteInvoiceFailure = (id, errorMessage) => ({
  type: aT.DELETE_INVOICE_FAILURE,
  id,
  message: errorMessage || 'Failed to delete invoice',
});

export const deleteInvoice = id => async (dispatch, getState) => {
  const endpoint = `/invoices/${id}`;
  const isDeleteRequested = getIsInvoiceRemoving(getState(), id);

  if (isDeleteRequested) {
    return null;
  }

  dispatch(deleteInvoiceRequest(id));

  try {
    const response = await axios.delete(endpoint);
    dispatch(deleteInvoiceSuccess(id));

    console.log('DELETE response ', response);
    return response.data;
  } catch (error) {
    dispatch(deleteInvoiceFailure(id, error.message));
    console.error(error);
    return null;
    // refetch invoices to revert to their state that was before removal began
  }
};
