import * as aT from 'constants/actionTypes';

const initialState = {
  displayInvoice: null,
};

const ui = (state = initialState, action) => {
  switch (action.type) {
    case aT.RESET_DISPLAY_INVOICE:
    // case aT.FETCH_INVOICES_REQUEST:
    // case aT.DELETE_INVOICE_REQUEST:
      return state.displayInvoice === null ? state : {
        displayInvoice: null,
      };
    case aT.CREATE_INVOICE_SUCCESS:
    case aT.UPDATE_INVOICE_SUCCESS:
      return {
        displayInvoice: action.id,
      };
    default:
      return state;
  }
};

export default ui;

export const getDisplayInvoice = state => state.displayInvoice;
