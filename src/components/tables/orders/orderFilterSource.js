import React, { useState } from 'react';
import { connect } from 'react-redux';
import Popover from 'react-tiny-popover';
import { get } from 'lodash';

import { ReactComponent as Cavet } from 'assets/img/cavet.svg';

import { updateOrderTableFilterAction } from './actions';

const MapSource = {
  TURNED_HUMAN: 'TURNED HUMAN',
  TURNED_NINJA: 'TURNED NINJA',
};

const OrderFilterSource = ({ source, updateOrderTableFilterAction, reducer }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const toggle = () => setIsPopoverOpen(!isPopoverOpen);

  const handleChangeStatus = (event) => {
    const { target } = event;
    const source = target.getAttribute('data');
    updateOrderTableFilterAction({
      payload: {
        source,
        page: 0,
      },
      reducer,
    });
  };

  return (
    <Popover
      isOpen={isPopoverOpen}
      position={'bottom'}
      transitionDuration={0.000001}
      padding={10}
      onClickOutside={toggle}
      content={() => (
        <div className='order__filter inside_popover'>
          <div className='list_status'>
            <button data='' onClick={handleChangeStatus} key={`list__source_option__all`} className={`status ${!source && 'active'}`}>
              All
            </button>
            <button data='TURNED_NINJA' onClick={handleChangeStatus} key={`list__source_option__TURNED_NINJA`} className={`status order__source TURNED_NINJA ${source === 'TURNED_NINJA' && 'active'}`}>
              {MapSource['TURNED_NINJA']}
            </button>

            <button data='TURNED_HUMAN' onClick={handleChangeStatus} key={`list__source_option__TURNED_HUMAN`} className={`status order__source TURNED_HUMAN ${source === 'TURNED_HUMAN' && 'active'}`}>
              {MapSource['TURNED_HUMAN']}
            </button>
          </div>
        </div>
      )}>
      <button onClick={() => setIsPopoverOpen(!isPopoverOpen)} className='filter__toggle middle'>
        <span className='dispaly_name'>{MapSource[source] || 'Source'}</span>
        <span className='icon mb-1 ml-2'>
          <Cavet />
        </span>
      </button>
    </Popover>
  );
};

const mapStateToProps = ({ orderTable, auth }, ownProps) => {
  const { reducer = 'orders' } = ownProps;
  const table = get(orderTable, `${reducer}`);
  return {
    accountInfo: auth.data.accountInfo,
    source: table.filter.source,
  };
};

const mapDispatchToProps = {
  updateOrderTableFilterAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderFilterSource);
