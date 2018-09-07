import React from 'react';
import PropTypes from 'prop-types';

import { Divider } from 'antd';

const PageHeader = ({ text }) => (
  <header className="page-header">
    <div>
      <span className="page-header__text">
        {text}
      </span>
    </div>
    {/* <div className="header__middle-line" /> */}
    <Divider />
  </header>
);

PageHeader.propTypes = {
  text: PropTypes.string.isRequired,
};

export default PageHeader;
