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

export const createInvoiceFailure = errorMessage => ({
  type: aT.CREATE_INVOICE_FAILURE,
  message: errorMessage || 'Failed to create invoice',
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
    dispatch(createInvoiceSuccess(normalized));
    return true; // NOTE: OR dispatched action ?
  } catch (error) {
    dispatch(createInvoiceFailure(error.message));
    console.error(error);
    return null;
  }
};
