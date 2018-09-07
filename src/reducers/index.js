import { combineReducers } from 'redux';
import { createSelector } from 'reselect';

import invoicesById from './invoicesById';
import listing, * as fromListing from './listing';
import activities, * as fromActivities from './activities';
import errors, * as fromErrors from './errors';
import ui, * as fromUI from './ui';

export default combineReducers({
  invoicesById,
  listing,
  activities,
  errors,
  ui,
});

export const getInvoiceIds = state => fromListing.getIds(state.listing);
export const getAllInvoicesById = state => state.invoicesById;
export const getInvoice = (state, id) => getAllInvoicesById(state)[id];

// export const getInvoicesList = state =>
//   getInvoiceIds(state).map(id => getAllInvoicesById(state)[id]);

export const getInvoicesList = createSelector(
  [getInvoiceIds, getAllInvoicesById],
  (invoiceIds, allInvoicesById) => invoiceIds.map(id => allInvoicesById[id]),
);

export const getInvoiceNumbers = createSelector(
  getInvoicesList, // or use "getAllInvoicesById" selector + Object.values()
  invoicesList => invoicesList.map(invoice => invoice.number),
);

export const getIsFetching = state =>
  fromActivities.getIsFetching(state.activities);

export const getIsCreating = state =>
  fromActivities.getIsCreating(state.activities);

export const getIsUpdating = state =>
  fromActivities.getIsUpdating(state.activities);

export const getDisplayInvoice = state => fromUI.getDisplayInvoice(state.ui);

// NOTE: when change to reselect version, probably should use makeSelector wrapper
export const getIsInvoiceRemoving = (state, id) =>
  fromListing.getToBeRemoved(state.listing).includes(id);

export const getFetchInvoicesError = state => fromErrors.getFetchError(state);
export const getCreateInvoiceError = state => fromErrors.getCreateError(state);
export const getUpdateInvoiceError = state => fromErrors.getUpdateError(state);
export const getDeleteInvoiceError = state => fromErrors.getDeleteError(state);
