import { combineReducers } from 'redux';
import * as aT from 'constants/actionTypes';
import { addIfNotExist } from 'utils/reducerHelpers';

// const initialState = {
//   ids: [], // TODO: change to null if not fetched yet
//   toBeRemoved: [],
// };

const ids = (state = [], action) => {
  switch (action.type) {
    case aT.FETCH_INVOICES_REQUEST:
      return []; // consider to remove ???
    case aT.FETCH_INVOICES_SUCCESS:
      return [...state, ...action.ids]; // TODO: megre ids with union or custom func ???
    case aT.CREATE_INVOICE_SUCCESS:
    case aT.UPDATE_INVOICE_SUCCESS:
      return addIfNotExist(state, action.id);
    case aT.DELETE_INVOICE_REQUEST:
      return state.filter(id => action.id !== id);
    // case aT.DELETE_INVOICE_SUCCESS:
    //   return state.filter(id => action.id !== id);
    case aT.DELETE_INVOICE_FAILURE:
      return addIfNotExist(state, action.id);
    default:
      return state;
  }
};

const toBeRemoved = (state = [], action) => {
  switch (action.type) {
    case aT.FETCH_INVOICES_REQUEST:
      return []; // is it necessary ???
    case aT.DELETE_INVOICE_REQUEST:
      return addIfNotExist(state, action.id);
    case aT.DELETE_INVOICE_SUCCESS:
    case aT.DELETE_INVOICE_FAILURE:
      return state.filter(id => action.id !== id);
    default:
      return state;
  }
};

export default combineReducers({
  ids,
  toBeRemoved,
});

export const getIds = listing => listing.ids;
export const getToBeRemoved = listing => listing.toBeRemoved;
