import axios from 'axios';
import {
  RESET_INVOICES_ERROR, RESET_DISPLAY_INVOICE,
} from 'constants/actionTypes';
import { API_BASE_URL } from 'constants/api';
import { makeActionCreator } from 'utils/makeActionCreator';

const makeAC = makeActionCreator;

axios.defaults.baseURL = API_BASE_URL;

export const resetInvoicesError = makeAC(RESET_INVOICES_ERROR, 'errorName');
export const resetDisplayInvoice = makeAC(RESET_DISPLAY_INVOICE);
