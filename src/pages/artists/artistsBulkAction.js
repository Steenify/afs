import React, { useState } from 'react';
import { connect } from 'react-redux';
import { filter } from 'lodash';
import Sticky from 'react-stickynode';

import { PERMITTIONS_CONFIG } from 'configs';

import ArtistSelectedAllCell from './artistSelectedAll';
import ArtistPayoutModal from './artistsPayoutModal';

const ArtistBulkAction = (props) => {
  const { selected, accountInfo } = props;
  const isHide = !selected || !selected?.length;

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const canPayOut = accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.CREATE_PAYOUT) && selected.filter((s) => s.numUnpaid > 0).length > 0;

  return (
    <div className={`order__bulk ${isHide && 'd-none'}`}>
      <Sticky enabled={process.env.REACT_APP_BUILD === 'DEV'} top={57}>
        <div className='wrapper'>
          <div className='btn-group'>
            <div className='btn btn-group__item'>
              <div className='d-flex align-items-center order__bulk__selected'>
                <ArtistSelectedAllCell />
                <span className='number'>{selected?.length} selected</span>
              </div>
            </div>
            {canPayOut && (
              <button type='button' className='btn btn-group__item' onClick={toggle}>
                Paid
              </button>
            )}
          </div>
        </div>
      </Sticky>

      <ArtistPayoutModal isOpen={isOpen} toggle={toggle} />
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
