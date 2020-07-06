import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  filter,
  isObject,
  unionBy,
  reduce,
  map,
  forEach,
  isEmpty,
} from 'lodash';
import NumberFormat from 'react-number-format';
import { toast } from 'react-toastify';

import PageModal from 'components/common/pageModal';
import Dropbox from 'components/common/dropbox';
import Button from 'components/common/button';

import { getOrderItem, getOrderOption, formatMoney } from 'utils';
import { statusPayments } from 'config';

import { createOrderPayoutsBulkAction, updateOrderItemsAcion } from './actions';

const OrderPayoutModal = ({
  isOpen,
  className,
  toggle,
  orders,
  totalBudget,
  defaultNote,
  createOrderPayoutsBulk,
  artist,
  updateOrderItems,
}) => {
  const hasArtist = !isEmpty(artist);

  const dropbox = useRef(null);

  const [extra, setExtra] = useState(0);

  const onChangeExtra = (data) => {
    setExtra(data.value);
  };

  const [note, setNote] = useState(defaultNote);

  useEffect(() => {
    setNote(defaultNote);
  }, [defaultNote]);

  const handleChangeNote = (e) => {
    const { value } = e.target;
    setNote(value);
  };

  const handleSubmit = () => {
    if (dropbox.current) {
      const files = dropbox.current.getFiles();

      let isDoneUpload = true;

      files.forEach((file) => {
        if (!file.isUploaded || !file.id) {
          isDoneUpload = false;
        }
      });

      if (!isDoneUpload) {
        toast.warn('Files is uploading!');
        return;
      }

      const attachments = files.map((file) => ({
        id: file.id,
        thumbnailLink: file?.thumbnailLink,
        url: file?.url,
        external: file?.external,
      }));

      const items = map(orders, (or) => ({
        bookingNumber: or.number,
        paid: or?.budget,
        payoutItemType: 'BOOKING_PAYMENT',
      }));

      if ((parseInt(extra, 10) || 0) > 0) {
        items.push({
          paid: parseInt(extra, 10),
          payoutItemType: 'EXTRA_PAYMENT',
        });
      }

      const payload = {
        artist,
        attachments,
        items,
        note,
        totalPaid: totalBudget + (parseInt(extra, 10) || 0),
      };

      createOrderPayoutsBulk(payload, () => {
        const messge = orders.map((or) => or?.number).join(', ');
        toast.dark(`Updated status payment of ${messge}`);
        setNote('');
        setExtra(0);
        forEach(orders, (item) => {
          updateOrderItems({
            id: item.id,
            field: 'artistPaymentStatus',
            value: statusPayments[0],
          });
        });
        forEach(orders, (item) => {
          updateOrderItems({
            id: item.id,
            field: 'selected',
            value: false,
          });
        });

        toggle();
      });
    }
  };

  return (
    <PageModal
      isOpen={isOpen}
      toggle={toggle}
      title={`Payouts ${artist?.firstName || ''} ${artist?.lastName || ''}`}
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
              orderNumber={`payout-${artist?.id}`}
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
              onClick={handleSubmit}
              disabled={!hasArtist}
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

  const orderTopay = filter(selectedOrder, (o) => {
    const isSameArtist = o?.assignedTo?.login === artist?.login;
    const isNotPayYet = o?.artistPaymentStatus !== statusPayments[0];

    return isSameArtist && isNotPayYet;
  });

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

  const defaultNote = `Payment for orders: ${notes.join(' + ')}`;

  return {
    accountInfo: auth.data.accountInfo,
    orders: orderTopay,
    artist,
    totalBudget,
    defaultNote,
  };
};

const mapDispatchToProps = {
  createOrderPayoutsBulk: createOrderPayoutsBulkAction,
  updateOrderItems: updateOrderItemsAcion,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderPayoutModal);
