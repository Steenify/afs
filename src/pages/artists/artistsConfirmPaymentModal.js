import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Spinner } from 'reactstrap';
import { filter, reduce, map } from 'lodash';
import NumberFormat from 'react-number-format';
import { toast } from 'react-toastify';
import update from 'react-addons-update';

import PageModal from 'components/common/pageModal';
import Button from 'components/common/button';

import { getOrderItem, getOrderOption, formatMoney, actionTryCatchCreator, mapDataByIds } from 'utils';

import { getPayoutInfoByArtists, confirmPayoutService } from 'services/payout';
const initialData = { loading: false, items: {}, currentArtistId: '', ids: [] };
const ArtistsConfirmPaymentModal = (props) => {
  const { isOpen, className, toggle, selectedArtists } = props;

  const [data, setData] = useState(initialData);

  useEffect(() => {
    if (isOpen && selectedArtists.length > 0) {
      const params = { artists: map(selectedArtists, (artist) => artist.id).join(',') };

      actionTryCatchCreator({
        service: getPayoutInfoByArtists(params),
        onPending: () => onChangeLoading(true),
        onError: () => onChangeLoading(false),
        onSuccess: (responseData = []) => {
          const { items, ids } = mapDataByIds(
            responseData.map((item) => {
              return { ...item, extra: 0, extraNote: '' };
            }) || [],
            'artist',
          );
          setData({ loading: false, currentArtistId: responseData?.[0]?.artist || '', items, ids });
        },
      });
    }
  }, [isOpen]);

  const onChangeLoading = (loading) => {
    setData((prev) => ({ ...prev, loading }));
  };

  const onChangeCurrent = (payload) => {
    setData(
      update(data, {
        items: {
          [data.currentArtistId]: {
            $merge: payload,
          },
        },
      }),
    );
  };

  const handleSubmit = () => {
    if (!data?.ids?.length) {
      return;
    }

    const payload =
      data?.ids?.map((id) => {
        const item = data.items[id] || null;
        return {
          artistId: item.artist,
          payout: map(item?.budgets || [], (or) => ({
            bookingNumber: or.bookingNumber,
            paid: or?.budget,
          })),
          extraPayment: Number(item?.extra || 0),
          note: item?.extraNote || '',
        };
      }) || [];
    actionTryCatchCreator({
      service: confirmPayoutService(payload),
      onPending: () => onChangeLoading(true),
      onError: () => onChangeLoading(false),
      onSuccess: () => {
        onChangeLoading(false);
        toast.dark(`Confirmation sent to ${selectedArtists.map((item) => item?.login || '').join(', ')}`);
        isOpen && toggle && toggle();
      },
    });
  };

  const selectArtist = (id) => {
    setData(update(data, { currentArtistId: { $set: id } }));
  };

  const canConfirm = selectedArtists.length > 0 && data.ids.length > 0;
  const current = data.items[data.currentArtistId] || {};
  const totalDisplay = reduce(current?.budgets || [], (total, item) => (total += parseInt(item.budget || 0, 10)), 0) + (parseInt(current?.extra || 0, 10) || 0);

  return (
    <PageModal size='lg' isOpen={isOpen} toggle={toggle} title={'Confirm Payment'} className={`artists__payout ${className}`}>
      {data?.loading ? (
        <div className='d-flex justify-content-center align-items-center'>
          <Spinner />
          <span className='text'>Loading</span>
        </div>
      ) : (
        <div className='payout__list row'>
          <div className='col-md-4 content_left'>
            <div className='payout__label mt-4 mb-4'>Artist:</div>
            {selectedArtists?.map(({ lastName, firstName, id }) => (
              <div key={`aritst_select_item_${id}`} className={`artist_item ${id === data.currentArtistId && 'artist_selected'}`} onClick={() => selectArtist(id)}>
                {`${firstName || ''} ${lastName}`}
              </div>
            ))}
          </div>
          <div className=' col-md-8 content_right'>
            <div className='mt-4' />
            {current?.budgets?.map((budget) => {
              const filteredItems = filter(budget.items, (item) => getOrderItem(item.name) !== 'Faster Processing');
              return (
                <div key={`order__payout__item__${budget.id}`}>
                  <div className='payout__item order'>
                    <div className='left'>
                      <span className='number'>#{budget.bookingNumber}</span>
                      <span className='name'>{getOrderOption((filteredItems[0] || {})?.name || '')}</span>
                    </div>
                    <div className='right'>
                      <strong className='money'>{formatMoney(budget.budget)}</strong>
                    </div>
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
                  value={current.extra}
                  onValueChange={(extraData) => onChangeCurrent({ extra: extraData.value })}
                />
              </div>
            </div>
            <textarea
              rows='2'
              placeholder={`Extra payment note`}
              number={'extra'}
              value={current.extraNote}
              onChange={(e) => {
                const extraNote = e.target.value;
                onChangeCurrent({ extraNote });
              }}
              className='form-control payout__note mb-3'
            />

            <div className='payout__divider' />

            <div className='payout__item total  mb-0'>
              <div className='left'>
                <span className='payout__label'>Total</span>
              </div>
              <div className='right'>
                <strong className='money'>{formatMoney(totalDisplay)}</strong>
              </div>
            </div>
          </div>
          <div className='payout__item action col mt-3'>
            <div className='left'>
              <Button color='normal' onClick={toggle} className='payout__cancel payout__action' type='button'>
                Cancel
              </Button>
            </div>
            <div className='right'>
              <Button onClick={handleSubmit} disabled={!canConfirm} color='primary' className='payout__submit payout__action' type='button'>
                Confirm Payment
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
  // const artist = filter(items, (a) => a.selected && a.numUnpaid > 0)[0] || {};
  const selectedArtists = filter(items, (a) => a.selected) || [];
  return {
    accountInfo: auth.data.accountInfo,
    // artist,
    selectedArtists,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistsConfirmPaymentModal);
