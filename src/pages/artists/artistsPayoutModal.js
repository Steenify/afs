import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Spinner } from 'reactstrap';
import { filter, reduce, map, isEmpty } from 'lodash';
import NumberFormat from 'react-number-format';
import { toast } from 'react-toastify';

import PageModal from 'components/common/pageModal';
import Dropbox from 'components/common/dropbox';
import Button from 'components/common/button';
import P from 'components/common/parapraph';

import { getOrderItem, getOrderOption, formatMoney, actionTryCatchCreator } from 'utils';
import { statusPayments } from 'configs';

import { createOrderTablePayoutsBulkAction } from 'components/tables/orders/actions';
import { getArtistsListAction } from './actions';
import { getAllOrdersService } from 'services/order';

const ArtistPayoutModal = (props) => {
  const { isOpen, className, toggle, artist, createOrderTablePayoutsBulkAction, getArtistsListAction } = props;
  console.log('ArtistPayoutModal -> artist', artist);

  const dropbox = useRef(null);
  const [extra, setExtra] = useState(0);
  const [noteItem, setNoteItem] = useState({});
  const [note, setNote] = useState();
  const [data, setData] = useState({ orders: [], loading: false, totalBudget: 0 });

  useEffect(() => {
    if (isOpen && !isEmpty(artist)) {
      const params = { assignee: artist.login, artistPaymentStatus: statusPayments[1], page: 0, size: 100 };
      actionTryCatchCreator({
        service: getAllOrdersService(params),
        onPending: () => setData((prev) => ({ ...prev, loading: true })),
        onError: () => setData((prev) => ({ ...prev, loading: false })),
        onSuccess: (data) => {
          const totalBudget = reduce(data, (total, item) => (total += parseInt(item.budget || 0, 10)), 0);
          const notes = map(data, (order) => {
            return `#${order.number}(${formatMoney(order.budget)})`;
          });
          setData({ orders: data, loading: false, totalBudget });
          setNote(`Payment for orders: ${notes.join(' + ')}`);
          setExtra(0);
          setNoteItem({});
        },
      });
    }
  }, [artist, isOpen]);

  const onChangeExtra = (data) => {
    setExtra(data.value);
  };

  const handleChangeNote = (e) => {
    const { value } = e.target;
    setNote(value);
  };

  const handleChangeNoteItems = (e) => {
    const { value } = e.target;
    const number = e.target.getAttribute('number');

    setNoteItem({ ...noteItem, [number]: value });
  };

  const handleSubmit = () => {
    if (dropbox.current) {
      const { orders, totalBudget } = data;
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
        onSuccess: () => {
          const messge = orders.map((or) => or?.number).join(', ');
          toast.dark(`Updated status payment of ${messge}`);
          setNote('');
          setExtra(0);
          setNoteItem({});
          getArtistsListAction();
          toggle();
        },
      });
    }
  };

  const totalDisplay = data?.totalBudget + (parseInt(extra, 10) || 0);
  const canPay = !isEmpty(artist) && data?.orders?.length > 0;

  return (
    <PageModal isOpen={isOpen} toggle={toggle} title={`Payouts ${artist?.firstName || ''} ${artist?.lastName || ''}`} className={`artists__payout ${className}`}>
      {data?.loading ? (
        <div className='d-flex justify-content-center align-items-center'>
          <Spinner />
          <span className='text'>Loading</span>
        </div>
      ) : (
        <div className='payout__list'>
          {data?.orders?.map((order) => {
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
          <textarea rows='2' placeholder={`Extra payment note`} number={'extra'} value={noteItem['extra'] || ''} onChange={handleChangeNoteItems} className='form-control payout__note mb-3' />

          <div className='payout__divider' />

          <div className='payout__item total'>
            <div className='left'>
              <span className='payout__label'>Total</span>
            </div>
            <div className='right'>
              <strong className='money'>{formatMoney(totalDisplay)}</strong>
            </div>
          </div>

          <div className='payout__divider' />

          <div className='payout__item note'>
            <div className='left'>
              <span className='payout__label'>Payment Info</span>
            </div>
            <div className='right'>
              <P text={artist?.paymentInfo || 'N/A'} id='ArtistPayBox' />
            </div>
          </div>

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
      )}
    </PageModal>
  );
};

const mapStateToProps = ({ artists, auth }) => {
  const { items } = artists.data;
  const artist = filter(items, (a) => a.selected && a.numUnpaid > 0)[0] || {};
  return {
    accountInfo: auth.data.accountInfo,
    artist,
  };
};

const mapDispatchToProps = { createOrderTablePayoutsBulkAction, getArtistsListAction };

export default connect(mapStateToProps, mapDispatchToProps)(ArtistPayoutModal);
