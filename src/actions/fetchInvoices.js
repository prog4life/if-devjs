import { normalize } from 'normalizr';
import axios from 'axios';
import * as aT from 'constants/actionTypes';
import { getIsFetching, getInvoiceIds } from 'reducers';
import { makeActionCreator } from 'utils/makeActionCreator';
import * as schemas from 'utils/schemas';

const makeAC = makeActionCreator;

export const fetchInvoicesRequest = makeAC(aT.FETCH_INVOICES_REQUEST);

export const fetchInvoicesSuccess = ({ entities, result }) => ({
  type: aT.FETCH_INVOICES_SUCCESS,
  invoices: entities.invoices,
  ids: result,
});

export const fetchInvoicesFailure = errorMessage => ({
  type: aT.FETCH_INVOICES_FAILURE,
  message: errorMessage || 'Failed to fetch invoices',
});

// const shouldFetchInvoices = (state) => {
//   if (getIsFetching(state) || getInvoiceIds(state).length > 0) {
//     return false;
//   }
//   return true;
// };

export const fetchInvoices = () => {
  return async (dispatch, getState) => {
    const endpoint = '/invoices';
    const state = getState();

    // TODO: consider to remove 2nd condition
    if (getIsFetching(state) || getInvoiceIds(state).length > 0) {
      return null;
    }

    dispatch(fetchInvoicesRequest());

    try {
      const response = await axios({
        url: endpoint,
      });
      const invoices = response.data;
      console.log('raw fetch_invoices response data', invoices);

      const normalized = normalize(invoices, schemas.invoicesList);

      console.log('normalized fetch_invoices response ', normalized);
      dispatch(fetchInvoicesSuccess(normalized));
      return invoices; // NOTE: return true or dispatched action ?
    } catch (error) {
      console.error(error);
      dispatch(fetchInvoicesFailure(error.message));
      return null;
    }
  };
};
