import { connect } from 'react-redux';

import { deleteInvoice } from 'actions';
import { getIsInvoiceRemoving } from 'reducers';

import ControlButtons from 'components/ControlButtons';

const mapStateToProps = (state, { id }) => ({
  isRemoving: getIsInvoiceRemoving(state, id),
});

const mergeProps = (stateProps, dispatchProps, { id }) => ({
  ...stateProps,
  id,
  onRemoveClick: () => dispatchProps.deleteInvoice(id),
});

export default connect(
  mapStateToProps,
  { deleteInvoice },
  mergeProps,
)(ControlButtons);
