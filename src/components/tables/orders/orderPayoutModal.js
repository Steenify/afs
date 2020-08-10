import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { filter, isObject, unionBy, reduce, map, forEach, isEmpty, get } from 'lodash';
import NumberFormat from 'react-number-format';
import { toast } from 'react-toastify';

import PageModal from 'components/common/pageModal';
import Dropbox from 'components/common/dropbox';
import Button from 'components/common/button';

import { getOrderItem, getOrderOption, formatMoney } from 'utils';
import { statusPayments } from 'configs';

import { createOrderTablePayoutsBulkAction, updateOrderTableItemsAction, confirmOrderTablePayoutsBulkAction } from './actions';

const OrderPayoutModal = ({ isOpen, className, toggle, orders, totalBudget, defaultNote, createOrderTablePayoutsBulkAction, confirmOrderTablePayoutsBulkAction, artist, updateOrderTableItemsAction, reducer }) => {
  const hasArtist = !isEmpty(artist);
  const canPay = hasArtist && orders.length > 0;

  const dropbox = useRef(null);

  const [extra, setExtra] = useState(0);
  const [noteItem, setNoteItem] = useState({});

  const onChangeExtra = (data) => {
    setExtra(data.value);
  };

  const [note, setNote] = useState(defaultNote);

  useEffect(() => {
    setNote(defaultNote);
    setExtra(0);
  }, [defaultNote]);

  const handleChangeNote = (e) => {
    const { value } = e.target;
    setNote(value);
  };

  const handleChangeNoteItems = (e) => {
    const { value } = e.target;
    const number = e.target.getAttribute('number');
    setNoteItem({ ...noteItem, [number]: value });
  };

  const handleArtistConfirmation = () => {
    const payload = {
      artistId: artist.id,
      payout: map(orders, (or) => ({
        bookingNumber: or.number,
        paid: or?.budget,
      })),
    };
    confirmOrderTablePayoutsBulkAction({
      payload,
      reducer,
      onSuccess: () => {
        toast.dark(`Confirmation sent to ${artist?.firstName || ''} ${artist?.lastName || ''}`);
      },
    });
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
        fileType: file?.fileType,
        url: file?.url,
        external: file?.external,
      }));

      const items = map(orders, (or) => ({
        bookingNumber: or.number,
        paid: or?.budget,
        payoutItemType: 'BOOKING_PAYMENT',
        note: noteItem[or?.number] || '',
      }));

      if ((parseInt(extra, 10) || 0) > 0) {
        items.push({
          paid: parseInt(extra, 10),
          payoutItemType: 'EXTRA_PAYMENT',
          note: noteItem['extra'] || '',
        });
      }

      const payload = {
        artist,
        attachments,
        items,
        note,
        totalPaid: totalBudget + (parseInt(extra, 10) || 0),
      };
      createOrderTablePayoutsBulkAction({
        payload,
        reducer,
        onSuccess: () => {
          const messge = orders.map((or) => or?.number).join(', ');
          toast.dark(`Updated status payment of ${messge}`);
          setNote('');
          setExtra(0);
          setNoteItem({});
          forEach(orders, (item) => {
            updateOrderTableItemsAction({
              payload: { id: item.id, field: 'artistPaymentStatus', value: statusPayments[0] },
              reducer,
            });
          });
          forEach(orders, (item) => {
            updateOrderTableItemsAction({
              payload: { id: item.id, field: 'selected', value: false },
              reducer,
            });
          });

          toggle();
        },
      });
    }
  };

  const totalDisplay = totalBudget + (parseInt(extra, 10) || 0);

  return (
    <PageModal isOpen={isOpen} toggle={toggle} title={`Payouts ${artist?.firstName || ''} ${artist?.lastName || ''}`} className={`order__payout ${className}`}>
      <div className='payout__list'>
        {orders.map((order) => {
          const filteredItems = filter(order.items, (item) => getOrderItem(item.name) !== 'Faster Processing');
          return (
            <div key={`order__payout__item__${order.id}`}>
              <div className='payout__item order'>
                <div className='left'>
                  <span className='number'>#{order.number}</span>
                  <span className='name'>{getOrderOption((filteredItems[0] || {})?.name || '')}</span>
                </div>
                <div className='right'>
                  <strong className='money'>{formatMoney(order.budget)}</strong>
                </div>
              </div>
              {/* <div className='payout__item__note'>
                <textarea
                  rows='2'
                  placeholder={`#${order.number} note`}
                  number={order.number}
                  value={noteItem[order.number] || ''}
                  onChange={handleChangeNoteItems}
                  className='form-control payout__note mb-3'
                />
              </div> */}
            </div>
          );
        })}

        <div className='payout__item extra'>
          <div className='left'>
            <span className='payout__label'>Extra Payment</span>
          </div>
          <div className='right'>
            <NumberFormat prefix={'$  '} thousandSeparator={true} className='form-control payout__extra money' value={extra} onValueChange={onChangeExtra} />
          </div>
        </div>
        <textarea rows='2' placeholder={`extra paymen note`} number={'extra'} value={noteItem['extra'] || ''} onChange={handleChangeNoteItems} className='form-control payout__note mb-3' />

        <div className='payout__divider'></div>

        <div className='payout__item total'>
          <div className='left'>
            <span className='payout__label'>Total</span>
          </div>
          <div className='right'>
            <strong className='money'>{formatMoney(totalDisplay)}</strong>
          </div>
        </div>

        <div className='payout__divider'></div>

        <div className='payout__item note'>
          <div className='left'>
            <span className='payout__label'>Note</span>
          </div>
          <div className='right'>
            <textarea rows='3' placeholder='extra note' value={note} onChange={handleChangeNote} className='form-control payout__note' />
          </div>
        </div>

        <div className='payout__item evidence'>
          <div className='left'>
            <span className='payout__label'>Evidence:</span>
          </div>
          <div className='right'>
            <Dropbox className='upload' orderNumber={`payout-${artist?.id}`} ref={dropbox} id={`order__payout__log`} />
          </div>
        </div>

        <div className='payout__item action'>
          <div className='left' />
          <div className='right'>
            <Button onClick={handleArtistConfirmation} disabled={!canPay} color='confirm' className='payout__submit payout__action' type='button'>
              Confirm Payment
            </Button>
          </div>
        </div>
        <div className='payout__item action'>
          <div className='left'>
            <Button color='normal' onClick={toggle} className='payout__cancel payout__action' type='button'>
              Cancel
            </Button>
          </div>
          <div className='right'>
            <Button onClick={handleSubmit} disabled={!canPay} color='primary' className='payout__submit payout__action' type='button'>
              Pay
            </Button>
          </div>
        </div>
      </div>
    </PageModal>
  );
};

const mapStateToProps = ({ orderTable, auth }, ownProps) => {
  const { reducer = 'orders' } = ownProps;
  const items = get(orderTable, `${reducer}.table.items`) || {};
  const selectedOrder = filter(items, (or) => or.selected && isObject(or.assignedTo));
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
      return (total += parseInt(item.budget || 0, 10));
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
  confirmOrderTablePayoutsBulkAction,
  createOrderTablePayoutsBulkAction,
  updateOrderTableItemsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderPayoutModal);
