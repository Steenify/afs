import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
const ContentCell = ({ isSend }) => {
  return isSend ? <div className='content sent_content'>Sent Content</div> : <div className='content'>N/A</div>;
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
  const sendDate = item?.sendDate || null;

  return {
    isSend: moment(sendDate).isValid(),
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ContentCell);
