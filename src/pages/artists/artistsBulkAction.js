import React, { useState } from 'react';
import { connect } from 'react-redux';
import { filter } from 'lodash';
import Sticky from 'react-stickynode';

import { PERMITTIONS_CONFIG } from 'configs';

import ArtistSelectedAllCell from './artistSelectedAll';
import ArtistPayoutModal from './artistsPayoutModal';
import ArtistsConfirmPaymentModal from './artistsConfirmPaymentModal';

const ArtistBulkAction = (props) => {
  const { selected, accountInfo } = props;
  const isHide = !selected || !selected?.length;

  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const toggleConfirm = () => setIsConfirmOpen(!isConfirmOpen);

  const canPayOut = accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.CREATE_PAYOUT) && selected.filter((s) => s.numUnpaid > 0).length === 1;
  const canConfirm = accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.CREATE_PAYOUT) && selected.filter((s) => s.numUnpaid > 0).length > 0;

  return (
    <div className={`order__bulk`} style={{ opacity: isHide ? 0 : 1 }}>
      <Sticky top={57}>
        <div className='wrapper'>
          <div className='btn-group'>
            <div className='btn btn-group__item d-flex align-items-center '>
              <div className='d-flex align-items-center order__bulk__selected'>
                <ArtistSelectedAllCell />
                <span className='number'>{selected?.length} selected</span>
              </div>
            </div>
            {canConfirm && (
              <button type='button' className='btn btn-group__item' onClick={toggleConfirm}>
                Confirm Payment
              </button>
            )}
            {canPayOut && (
              <button type='button' className='btn btn-group__item' onClick={toggle}>
                Paid
              </button>
            )}
          </div>
        </div>
      </Sticky>

      <ArtistPayoutModal isOpen={isOpen} toggle={toggle} />
      <ArtistsConfirmPaymentModal isOpen={isConfirmOpen} toggle={toggleConfirm} />
    </div>
  );
};

const mapStateToProps = ({ artists, auth }) => {
  const { items } = artists.data;
  const selected = filter(items, (or) => or.selected);
  return {
    accountInfo: auth.data.accountInfo,
    selected,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistBulkAction);
