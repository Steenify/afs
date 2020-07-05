import React from 'react';
import { connect } from 'react-redux';
import P from 'components/common/parapraph';

const PayoutsNoteCell = ({ note, goToDetail, transactionId }) => {
  return (
    <div onClick={() => goToDetail(transactionId)} className={`payouts__note`}>
      <P text={note} className='m-0' id={`comment__item__${transactionId}`} />
    </div>
  );
};

const mapStateToProps = ({ payouts }, ownProps) => {
  const { data } = ownProps;
  const { items } = payouts.list;
  const item = items[data] || {};

  return {
    note: item?.note,
    transactionId: item?.transactionId,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PayoutsNoteCell);
