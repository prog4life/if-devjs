import React from 'react';
import pT from 'prop-types';

import { Button } from 'antd';

import ButtonLink from './ButtonLink';

const ControlButtons = ({ id, isRemoving, onRemoveClick }) => (
  <div className="actions">
    {!isRemoving
      && (
        <ButtonLink
          className="actions__edit-button"
          type="primary"
          to={`/edit/${id}`}
        >
          {'Edit'}
        </ButtonLink>
      )
    }
    <Button
      className="actions__remove-button"
      type="primary"
      onClick={onRemoveClick}
      loading={isRemoving}
    >
      {isRemoving ? 'Removing...' : 'Remove' }
    </Button>
  </div>
);

ControlButtons.propTypes = {
  id: pT.string.isRequired,
  isRemoving: pT.bool.isRequired,
  onRemoveClick: pT.func.isRequired,
};

export default ControlButtons;
