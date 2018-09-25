import React from 'react';
import PropTypes from 'prop-types';

const Paper = ({ className, title, children }) => (
  <div className={className ? `paper ${className}` : 'paper'}>
    {title
      && (
        <header className="paper__title">
          {title}
        </header>
      )
    }
    {children}
  </div>
);

Paper.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  title: PropTypes.string,
};

Paper.defaultProps = {
  children: null,
  className: '',
  title: '',
};

export default Paper;
