import { combineReducers } from 'redux';
import * as aT from 'constants/actionTypes';

function createActivityReducer(types) {
  const [requestType, successType, failureType] = types;
  // TODO: validate types
  return (state = false, action) => {
    switch (action.type) {
      case requestType:
        return true;
      case successType:
      case failureType:
        return false;
      default:
        return state;
    }
  };
}

const isFetching = createActivityReducer([
  aT.FETCH_INVOICES_REQUEST, aT.FETCH_INVOICES_SUCCESS, aT.FETCH_INVOICES_FAILURE,
]);

const isCreating = createActivityReducer([
  aT.CREATE_INVOICE_REQUEST, aT.CREATE_INVOICE_SUCCESS, aT.CREATE_INVOICE_FAILURE,
]);

const isUpdating = createActivityReducer([
  aT.UPDATE_INVOICE_REQUEST, aT.UPDATE_INVOICE_SUCCESS, aT.UPDATE_INVOICE_FAILURE,
]);

export default combineReducers({
  isFetching,
  isCreating,
  isUpdating,
});

export const getIsFetching = activities => activities.isFetching;
export const getIsCreating = activities => activities.isCreating;
export const getIsUpdating = activities => activities.isUpdating;
