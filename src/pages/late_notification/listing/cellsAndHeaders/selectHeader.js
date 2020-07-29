import React from 'react';
import { connect } from 'react-redux';
import { filter } from 'lodash';

import { updateAllSelectionAction } from '../action';

const SelectHeader = ({ selected, updateAllSelectionAction }) => {
  const handleChange = (status) => {
    updateAllSelectionAction(status);
  };

  return (
    <label className='cus-checkbox'>
      <input className='form-control sr-only' type='checkbox' onChange={() => handleChange(!selected)} checked={selected} />
      <span className='checkmark'></span>
    </label>
  );
};

const mapStateToProps = ({
  lateNotification: {
    listing: {
      data: { items = [] },
    },
  },
}) => {
  const selected = filter(items, (or) => or.selected).map((or) => or.id);

  return {
    selected: selected.length > 0,
  };
};

const mapDispatchToProps = {
  updateAllSelectionAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectHeader);
