import React from 'react';
import PropTypes from 'prop-types';
import RouterPropTypes from 'react-router-prop-types';
import { Button } from 'antd';
import { withRouter } from 'react-router-dom';

const ButtonLink = (props) => {
  const {
    match,
    location,
    history,
    staticContext,
    to,
    onClick,
    children,
    ...rest
  } = props;

  const handleClick = (event) => {
    if (onClick) {
      onClick(event);
    }
    history.push(to);
  };

  return (
    <Button
      {...rest}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
};

ButtonLink.propTypes = {
  children: PropTypes.node.isRequired,
  /* eslint-disable react/no-typos */
  history: RouterPropTypes.history.isRequired,
  location: RouterPropTypes.location.isRequired,
  match: RouterPropTypes.match.isRequired,
  onClick: PropTypes.func,
  staticContext: PropTypes.shape({}),
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
};

ButtonLink.defaultProps = {
  onClick: null,
  staticContext: null,
};

export default withRouter(ButtonLink);
