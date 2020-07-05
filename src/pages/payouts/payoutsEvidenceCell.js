import React from 'react';
import { connect } from 'react-redux';

import ImageGallery from 'components/common/imageGallery';
import { getListImageUrl } from 'utils';

const PayoutsEvidenceCell = ({ attachments }) => {
  const renderItem = ({ onClick, key }) => {
    return (
      <span className='payouts__link' key={key} onClick={onClick}>
        Link
      </span>
    );
  };

  return (
    <div className={`payouts__evidence`}>
      <ImageGallery
        images={getListImageUrl(attachments)}
        renderItem={renderItem}
        alt={`payout`}
        caption={'payout'}
      />
    </div>
  );
};

const mapStateToProps = ({ payouts }, ownProps) => {
  const { data } = ownProps;
  const { items } = payouts.list;
  const item = items[data] || {};

  return {
    attachments: item?.attachments,
    code: item?.code,
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PayoutsEvidenceCell);
