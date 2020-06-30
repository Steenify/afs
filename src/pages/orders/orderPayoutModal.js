import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { filter, isObject, unionBy, reduce, map } from 'lodash';
import NumberFormat from 'react-number-format';

import PageModal from 'components/common/pageModal';
import Dropbox from 'components/common/dropbox';
import Button from 'components/common/button';

import { getOrderItem, getOrderOption, formatMoney } from 'utils';

const OrderPayoutModal = ({
  isOpen,
  className,
  toggle,
  orders,
  totalBudget,
  defaultNote,
}) => {
  const dropbox = useRef(null);

  const [extra, setExtra] = useState(0);

  const onChangeExtra = (data) => {
    setExtra(data.value);
  };

  const [note, setNote] = useState('');

  const handleChangeNote = (e) => {
    const { value } = e.target;
    setNote(value);
  };

  const noteWithExtra = `${defaultNote} ${
    extra > 0 ? ' + ' + formatMoney(extra) : ''
  }  ${note ? ', ' + note : ''}`;

  return (
    <PageModal
      isOpen={isOpen}
      toggle={toggle}
      title='Payouts'
      className={`order__payout ${className}`}>
      <div className='payout__list'>
        {orders.map((order) => {
          const filteredItems = filter(
            order.items,
            (item) => getOrderItem(item.name) !== 'Faster Processing',
          );
          return (
            <div
              key={`order__payout__item__${order.id}`}
              className='payout__item order'>
              <div className='left'>
                <span className='number'>#{order.number}</span>
                <span className='name'>
                  {getOrderOption((filteredItems[0] || {})?.name || '')}
                </span>
              </div>
              <div className='right'>
                <strong className='money'>{formatMoney(order.budget)}</strong>
              </div>
            </div>
          );
        })}

        <div className='payout__item extra'>
          <div className='left'>
            <span className='payout__label'>Extra Payment</span>
          </div>
          <div className='right'>
            <NumberFormat
              prefix={'$  '}
              thousandSeparator={true}
              className='form-control payout__extra money'
              value={extra}
              onValueChange={onChangeExtra}
            />
          </div>
        </div>

        <div className='payout__divider'></div>

        <div className='payout__item total'>
          <div className='left'>
            <span className='payout__label'>Total</span>
          </div>
          <div className='right'>
            <strong className='money'>{formatMoney(totalBudget)}</strong>
          </div>
        </div>

        <div className='payout__divider'></div>

        <div className='payout__item note'>
          <div className='left'>
            <span className='payout__label'>Note</span>
          </div>
          <div className='right'>
            <p>{noteWithExtra}</p>

            <textarea
              rows='3'
              placeholder='extra note'
              value={note}
              onChange={handleChangeNote}
              className='form-control payout__note'
            />
          </div>
        </div>

        <div className='payout__item evidence'>
          <div className='left'>
            <span className='payout__label'>Evidence:</span>
          </div>
          <div className='right'>
            <Dropbox
              className='upload'
              ref={dropbox}
              id={`order__payout__log`}
            />
          </div>
        </div>

        <div className='payout__item action'>
          <div className='left'>
            <Button
              color='normal'
              onClick={toggle}
              className='payout__cancel payout__action'
              type='button'>
              Cancel
            </Button>
          </div>
          <div className='right'>
            <Button
              color='primary'
              className='payout__submit payout__action'
              type='button'>
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </PageModal>
  );
};

const mapStateToProps = ({ order, auth }) => {
  const { items } = order.list;
  const selectedOrder = filter(
    items,
    (or) => or.selected && isObject(or.assignedTo),
  );
  const artistSelected = unionBy(selectedOrder, 'assignedTo');
  const artist = artistSelected[0]?.assignedTo || {};

  const orderTopay = filter(
    selectedOrder,
    (o) => o?.assignedTo?.login === artist?.login,
  );

  const totalBudget = reduce(
    orderTopay,
    (total, item) => {
      return (total += item.budget);
    },
    0,
  );

  const notes = map(orderTopay, (order) => {
    return `#${order.number}(${formatMoney(order.budget)})`;
  });

  const defaultNote = `Payment for: ${notes.join(' + ')}`;

  return {
    accountInfo: auth.data.accountInfo,
    orders: orderTopay,
    artist,
    totalBudget,
    defaultNote,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(OrderPayoutModal);
