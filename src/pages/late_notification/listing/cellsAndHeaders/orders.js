import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
const ContentCell = ({ orders }) => {
  return (
    <div>
      {orders.map(({ id = 0, number = '', code = '' }, index) => (
        <React.Fragment>
          <Link to={`/order/${code}`}>
            <span className='order_number' key={`order__number_${index}`}>{`#${number}`}</span>
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
