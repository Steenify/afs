import React from 'react';
import { connect } from 'react-redux';

const OrderSelectedCell = ({
  row: { index, original },
  column: { id },
  updateCell,
}) => {
  const handleChange = (checked) => {
    updateCell(index, id, checked, original);
  };
  return (
    <label className='cus-checkbox'>
      <input
        className='form-control sr-only'
        type='checkbox'
        checked={original.selected}
        onChange={() => handleChange(!original.selected)}
      />
      <span className='checkmark'></span>
    </label>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(OrderSelectedCell);
