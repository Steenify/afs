import React, { useState } from 'react';
import Popover from 'react-tiny-popover';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { get } from 'lodash';

import Button from 'components/common/button';
import ImageGallery from 'components/common/imageGallery';
import { getListImageUrl } from 'utils';

import { PERMITTIONS_CONFIG } from 'configs';

import { ReactComponent as Eye } from 'assets/img/eye.svg';
import { ReactComponent as CloseIcon } from 'assets/img/close.svg';

const OrderDetailCell = ({ number, code, items, accountInfo, id }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const toggle = () => setIsPopoverOpen(!isPopoverOpen);

  if (!accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.VIEW_BOOKING)) {
    return <div className=''>#{number}</div>;
  }

  return (
    <div>
      <div className='order__toggle__group d-flex align-items-center'>
        <Button tag={Link} className='w-100 order__link p-0' style={{ minWidth: 'auto' }} to={`/order/${code}`} color='link'>
          #{number}
        </Button>
        <Popover
          isOpen={isPopoverOpen}
          transitionDuration={0.000001}
          position={'right'}
          padding={10}
          disableReposition
          onClickOutside={toggle}
          content={() => (
            <div className='order__dropdowns order__info'>
              <button type='button' className='modal-close' onClick={toggle}>
                <span className='icon'>
                  <CloseIcon />
                </span>
              </button>
              <div>
                {items.map((item) => {
                  return (
                    <div key={`order__item__${number}__${item.id}`} className='content'>
                      <strong className='name d-block'>{item.name}</strong>
                      {item.note ? (
                        <div>
                          <label className='mb-0'> Note: </label>
                          <p className='note'>{item.note}</p>
                        </div>
                      ) : null}
                      {item.photos && item.photos.length ? (
                        <div>
                          <label className='mb-0'> Images: </label>
                          <div className='images'>
                            <ImageGallery images={getListImageUrl(item.photos)} alt={item.name} caption={item.name} />
                          </div>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          )}>
          <Button color='link' id={`order_detail_cell__${id}`} style={{ minWidth: 'auto' }} onClick={() => setIsPopoverOpen(!isPopoverOpen)} className='order__toggle order__toggle__nocavet'>
            <span className='icon' style={{ opacity: 1 }}>
              <Eye />
            </span>
          </Button>
        </Popover>
      </div>
    </div>
  );
};
const mapStateToProps = (reducers, ownProps) => {
  const { auth } = reducers;
  const { data, reducer = 'orders' } = ownProps;
  const item = get(reducers, `orderTable.${reducer}.table.items`)?.[data] || {};
  return {
    id: item?.id || 0,
    number: item?.number || 0,
    code: item?.code || '',
    items: item?.items || [],
    accountInfo: auth.data.accountInfo,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailCell);
