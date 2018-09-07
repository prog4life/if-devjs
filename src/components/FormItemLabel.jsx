import React from 'react';
import PropTypes from 'prop-types';

const FormItemLabel = ({ labelText }) => (
  <span className="form-item-label">
    {labelText}
  </span>
);

FormItemLabel.propTypes = {
  labelText: PropTypes.string.isRequired,
};

export default FormItemLabel;
