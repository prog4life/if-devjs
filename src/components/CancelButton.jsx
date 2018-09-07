import React from 'react';
import pT from 'prop-types';
import classNames from 'classnames';
import ButtonLink from './ButtonLink';

const CancelButton = ({
  className, text, to, type, ...props
}) => (
  <ButtonLink
    className={classNames('cancel-button', className)}
    to={to}
    type={type}
    {...props}
  >
    {text}
  </ButtonLink>
);

CancelButton.propTypes = {
  className: pT.string,
  text: pT.string,
  to: pT.string,
  type: pT.string,
};

CancelButton.defaultProps = {
  className: '',
  text: 'Cancel',
  to: '/',
  type: 'primary',
};

export default CancelButton;
