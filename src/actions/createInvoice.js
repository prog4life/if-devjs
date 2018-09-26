import { normalize } from 'normalizr';
import axios from 'axios';
import * as aT from 'constants/actionTypes';
import { makeActionCreator } from 'utils/makeActionCreator';
import * as schemas from 'utils/schemas';

const makeAC = makeActionCreator;

export const createInvoiceRequest = makeAC(aT.CREATE_INVOICE_REQUEST);

export const createInvoiceSuccess = makeActionCreator(
  aT.CREATE_INVOICE_SUCCESS,
  ({ entities, result }) => ({ invoices: entities.invoices, id: result }),
);

// export const createInvoiceSuccess = ({ entities, result }) => ({
//   type: aT.CREATE_INVOICE_SUCCESS,
//   invoices: entities.invoices,
//   id: result,
// });

export const createInvoiceFailure = ({ message } = {}) => ({
  type: aT.CREATE_INVOICE_FAILURE,
  error: true,
  message: message || 'Failed to create invoice',
});

export const createInvoice = invoice => async (dispatch) => {
  const endpoint = '/invoices';
  // TODO: prevent duplicated request
  dispatch(createInvoiceRequest());

  try {
    const response = await axios.post(endpoint, invoice, { // TODO: stringify ???
      headers: { 'Content-Type': 'application/json' },
    });
    console.log('raw create_invoice POST response data', response.data);

    const normalized = normalize(response.data, schemas.invoice);

    console.log('normalized create_invoice response ', normalized);
    return dispatch(createInvoiceSuccess(normalized)); // NOTE: OR dispatched action ?
  } catch (error) {
    console.error(error);
    return dispatch(createInvoiceFailure(error));
  }
};
