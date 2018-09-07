import * as aT from 'constants/actionTypes';

const invoicesById = (state = {}, action) => {
  // TODO:
  // if (action.invoices) {
  //   return { ...state, ...action.invoices };
  // }

  // switch (action.type) {
  //   case aT.DELETE_INVOICE_SUCCESS: {
  //     const { [action.id]: deleted, ...rest } = state;

  //     return { ...rest };
  //   }
  //   default:
  //     return state;
  // }
  switch (action.type) {
    case aT.FETCH_INVOICES_REQUEST:
      return {}; // consider to remove ???
    case aT.FETCH_INVOICES_SUCCESS:
    case aT.CREATE_INVOICE_SUCCESS:
    case aT.UPDATE_INVOICE_SUCCESS:
      return { ...state, ...action.invoices };
    case aT.DELETE_INVOICE_SUCCESS: {
      const { [action.id]: deleted, ...rest } = state;

      return { ...rest };
    }
    default:
      return state;
  }
};

export default invoicesById;
