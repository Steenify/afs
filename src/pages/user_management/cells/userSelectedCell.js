import React from 'react';
import { connect } from 'react-redux';

import { updateUserItemsAction } from 'pages/user_management/actions';

const UserSelectedCell = ({ selected, updateUserItemsAction, id }) => {
  const handleChange = (checked) => {
    updateUserItemsAction({
      id: id,
      field: 'selected',
      value: checked,
    });
  };
  return (
    <label className='cus-checkbox'>
      <input className='form-control sr-only' type='checkbox' checked={selected} onChange={() => handleChange(!selected)} />
      <span className='checkmark'></span>
    </label>
  );
};

const mapStateToProps = ({ user }, ownProps) => {
  const { data } = ownProps;
  const { items } = user.list;
  const item = items[data] || {};
  return {
    id: item?.id || 0,
    selected: item?.selected || false,
  };
};

const mapDispatchToProps = {
  updateUserItemsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserSelectedCell);
