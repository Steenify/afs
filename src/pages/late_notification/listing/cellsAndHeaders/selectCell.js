import React from 'react';
import { connect } from 'react-redux';

import { updateItemAction } from '../action';

const SelectedCell = ({ selected, updateItemAction, id }) => {
  const handleChange = (value) => {
    updateItemAction({ id, field: 'selected', value });
  };
  return (
    <label className='cus-checkbox'>
      <input className='form-control sr-only' type='checkbox' checked={selected} onChange={() => handleChange(!selected)} />
      <span className='checkmark'></span>
    </label>
  );
};

const mapStateToProps = (
  {
    lateNotification: {
      listing: {
        data: { items },
      },
    },
  },
  ownProps,
) => {
  const { data } = ownProps;
  const item = items[data] || {};
  return {
    id: item?.id || 0,
    selected: item?.selected || false,
  };
};

const mapDispatchToProps = {
  updateItemAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectedCell);
