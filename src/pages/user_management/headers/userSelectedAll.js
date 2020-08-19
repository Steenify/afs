import React from 'react';
import { connect } from 'react-redux';
import { filter } from 'lodash';

import { updateAllUserSelectedAction } from 'pages/user_management/actions';

const UserSelectedAll = ({ selected, updateAllUserSelectedAction }) => {
  const handleChange = (status) => {
    updateAllUserSelectedAction(status);
  };

  return (
    <label className='cus-checkbox'>
      <input className='form-control sr-only' type='checkbox' onChange={() => handleChange(!selected)} checked={selected} />
      <span className='checkmark'></span>
    </label>
  );
};

const mapStateToProps = ({ user }) => {
  const { items } = user.list;
  const selected = filter(items, (or) => or.selected).map((or) => or.id);

  return {
    selected: selected.length > 0,
  };
};

const mapDispatchToProps = {
  updateAllUserSelectedAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserSelectedAll);
