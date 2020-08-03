import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
const ContentCell = ({ orders }) => {
  return (
    <div>
      {orders.map(({ id = 0, number = '', code = '' }, index) => (
        <React.Fragment key={`order__number_${index}`}>
          <Link to={`/order/${code}`}>
            <span className='order_number'>{`#${number}`}</span>
          </Link>
          {index !== orders.length - 1 && <span>, </span>}
        </React.Fragment>
      ))}
    </div>
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
  const orders = item?.lateBookings || null;

  return {
    orders,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ContentCell);
