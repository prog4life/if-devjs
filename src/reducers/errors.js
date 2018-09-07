import { combineReducers } from 'redux';
import * as aT from 'constants/actionTypes';

const createErrorReducer = (types) => {
  const [REQUEST_TYPE, FAILURE_TYPE, RESET_ERROR_TYPE] = types;

  return (state = null, action) => {
    switch (action.type) {
      case REQUEST_TYPE:
      case RESET_ERROR_TYPE: // BUG: it resets all errors at once,
      // regardless to errorName from action                                     !!!
        return null;
      case FAILURE_TYPE:
        return action.message;
      default:
        return state;
    }
  };
};

const fetchInvoices = createErrorReducer([
  aT.FETCH_INVOICES_REQUEST, aT.FETCH_INVOICES_FAILURE, aT.RESET_INVOICES_ERROR,
]);

const createInvoice = createErrorReducer([
  aT.CREATE_INVOICE_REQUEST, aT.CREATE_INVOICE_FAILURE, aT.RESET_INVOICES_ERROR,
]);

const updateInvoice = createErrorReducer([
  aT.UPDATE_INVOICE_REQUEST, aT.UPDATE_INVOICE_FAILURE, aT.RESET_INVOICES_ERROR,
]);

const deleteInvoice = createErrorReducer([
  aT.DELETE_INVOICE_REQUEST, aT.DELETE_INVOICE_FAILURE, aT.RESET_INVOICES_ERROR,
]);

export default combineReducers({
  fetchInvoices,
  createInvoice,
  updateInvoice,
  deleteInvoice,
});

export const getFetchError = state => state.fetchInvoices;
export const getCreateError = state => state.createInvoice;
export const getUpdateError = state => state.updateInvoice;
export const getDeleteError = state => state.deleteInvoice;

// ------------------------ PREVIOUS VERSION ----------------------------------

// const initialState = {
//   fetch: null,
//   create: null,
//   update: null,
//   delete: null,
// };

// const extractErrorName = (type) => {
//   const underscoreIndex = type.indexOf('_'); // TODO: switch to last index
//   // 'fetch', 'create', 'update', 'delete'
//   const errorName = type.slice(0, underscoreIndex).toLowerCase();
//
//   return errorName;
// };

// const errors = (state = initialState, action) => {
//   switch (action.type) {
//     case aT.FETCH_INVOICES_REQUEST:
//     case aT.CREATE_INVOICE_REQUEST:
//     case aT.UPDATE_INVOICE_REQUEST:
//     case aT.DELETE_INVOICE_REQUEST:
//       return {
//         ...state,
//         [extractErrorName(action.type)]: null,
//       };
//     case aT.FETCH_INVOICES_FAILURE:
//     case aT.CREATE_INVOICE_FAILURE:
//     case aT.UPDATE_INVOICE_FAILURE:
//     case aT.DELETE_INVOICE_FAILURE:
//       return {
//         ...state,
//         [extractErrorName(action.type)]: action.message,
//       };
//     case aT.RESET_INVOICES_ERROR:
//       return {
//         ...state,
//         [action.errorName]: null,
//       };
//     default:
//       return state;
//   }
// };

// export default errors;

// export const getError = (state, error) => state[error];
