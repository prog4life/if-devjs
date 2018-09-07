import React from 'react';
import pT from 'prop-types';
import classNames from 'classnames';
import { Button } from 'antd';

const SubmitButton = ({
  className, text, type, htmlType, isLoading, ...props
}) => (
  <Button
    className={classNames('submit-button', className)}
    type={type}
    htmlType={htmlType}
    loading={isLoading}
    {...props}
  >
    {text}
  </Button>
);

SubmitButton.propTypes = {
  className: pT.string,
  htmlType: pT.string,
  isLoading: pT.bool,
  text: pT.string,
  type: pT.string,
};

SubmitButton.defaultProps = {
  className: '',
  htmlType: 'submit',
  isLoading: false,
  text: 'Submit',
  type: 'primary',
};

export default SubmitButton;
