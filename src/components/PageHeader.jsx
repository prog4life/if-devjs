import React from 'react';
import PropTypes from 'prop-types';

const PageHeader = ({ text }) => (
  <header className="page-header">
    <div className="page-header__title">
      <span>
        {text}
      </span>
    </div>
    <hr className="page-header__line" />
  </header>
);

PageHeader.propTypes = {
  text: PropTypes.string.isRequired,
};

export default PageHeader;
