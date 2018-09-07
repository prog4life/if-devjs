import { normalize } from 'normalizr';
import axios from 'axios';
import * as aT from 'constants/actionTypes';
import { makeActionCreator } from 'utils/makeActionCreator';
import * as schemas from 'utils/schemas';

const makeAC = makeActionCreator;

export const updateInvoiceRequest = makeAC(aT.UPDATE_INVOICE_REQUEST);

export const updateInvoiceSuccess = makeActionCreator(
  aT.UPDATE_INVOICE_SUCCESS,
  ({ entities, result }) => ({ invoices: entities.invoices, id: result }),
);

// export const updateInvoiceSuccess = ({ entities, result }) => ({
//   type: aT.UPDATE_INVOICE_SUCCESS,
//   invoices: entities.invoices,
//   id: result,
// });

export const updateInvoiceFailure = errorMessage => ({
  type: aT.UPDATE_INVOICE_FAILURE,
  message: errorMessage || 'Failed to update invoice',
});

export const updateInvoice = (invoice, id) => async (dispatch) => {
  const endpoint = `/invoices/${id}`;
  // TODO: prevent duplicated request
  console.log('endpoint: ', endpoint);
  console.log('updated invoice: ', invoice);

  dispatch(updateInvoiceRequest());

  try {
    const response = await axios.patch(endpoint, invoice, {
      headers: { 'Content-Type': 'application/json' },
    });
    console.log('PATCH response ', response);

    const normalized = normalize(response.data, schemas.invoice);

    console.log('normalized update_invoice response ', normalized);
    dispatch(updateInvoiceSuccess(normalized));
    return true;
  } catch (error) {
    dispatch(updateInvoiceFailure(error.message));
    console.error(error);
    return null;
  }
};
