import React from 'react';
import { connect } from 'react-redux';
import { formatMoney } from 'utils';

const ArtistUnpaidCell = ({ numUnpaid, totalUnpaid }) => {
  return (
    <div className='artist__unpaid artists__cell'>
      {totalUnpaid && (
        <div>
          {`${formatMoney(totalUnpaid)}`}
          <div style={{ fontSize: '12px' }} className='text-muted'>
            ({numUnpaid} orders)
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ artists }, ownProps) => {
  const { data } = ownProps;
  const { items } = artists.data;
  const item = items[data] || {};
  return {
    numUnpaid: item?.numUnpaid || 0,
    totalUnpaid: item?.totalUnpaid || 0,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistUnpaidCell);
