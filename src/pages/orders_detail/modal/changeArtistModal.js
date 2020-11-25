import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { isEmpty, debounce } from 'lodash';

import { Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from 'reactstrap';
import { ReactComponent as CloseIcon } from 'assets/img/close.svg';
import { ReactComponent as BackIcon } from 'assets/img/back.svg';

import { updateShowAssignedBoxAction, ASSIGNED_MODAL_KEYs, getAssignArtistsAction } from '../actions';
import { updateOrderTableAssignArtistAction } from 'components/tables/orders/actions';
const ChangeArtistModal = ({ order, isOpen, updateShowAssignedBoxAction, getAssignArtistsAction, updateOrderTableAssignArtistAction }) => {
  const [loading, setLoading] = useState(false);
  const [artists, setArtists] = useState([]);
  const [searchText, setSearchText] = useState('');
  const assignedTo = order?.assignedTo;

  useEffect(() => {
    debouncedGetAssignArtistsAction(searchText);
  }, [searchText]);

  useEffect(() => {
    if (!isOpen) {
      setSearchText('');
    }
  }, [isOpen]);

  const debouncedGetAssignArtistsAction = useCallback(
    debounce((text) => {
      getAssignArtistsAction({
        params: { text },
        onPending: () => {
          setLoading(true);
        },
        onSuccess: (data) => {
          setLoading(false);
          setArtists(data);
        },
        onError: () => {
          setLoading(false);
        },
      });
    }, 500),
    [],
  );

  const toggle = () => updateShowAssignedBoxAction(false);
  const onBack = () => {
    if (window.innerWidth < 991) {
      updateShowAssignedBoxAction(ASSIGNED_MODAL_KEYs.ASSIGNED);
    } else {
      updateShowAssignedBoxAction('');
    }
  };
  const onSave = (artist) => {
    if ((assignedTo || {})['login'] === artist?.login) {
      toast.warn('Please select new artist!');
      return;
    }

    if (isEmpty(artist)) {
      toast.warn('Please select Artist');
      return;
    }

    const payload = { id: order.id, to: artist.login };
    const name = artist.login !== 'null' ? artist.firstName : '_______';
    updateOrderTableAssignArtistAction({
      payload,
      onSuccess: () => {
        onBack();
        toast.dark(`Order [#${order?.number}] is assigned to [${name}]`);
      },
    });
  };
  return (
    <Modal isOpen={isOpen} toggle={toggle} fade={false} size='lg' className='modal-dialog-centered  modal-no-border order_detail__assignedModal'>
      <div className='assignedModal'>
        <ModalHeader toggle={toggle}>
          <div className='d-flex align-items-center'>
            <button type='button' className='back mr-2' onClick={onBack}>
              <BackIcon width='25px' height='25px' />
            </button>
            <div>Change Artist</div>
          </div>
          <button type='button' className='modal-close' onClick={toggle}>
            <CloseIcon width='25px' height='25px' />
          </button>
        </ModalHeader>
        <ModalBody>
          <div className='order__artist'>
            <div className='search mb-3'>
              <input
                type='text'
                style={{ height: 40 }}
                placeholder='Search artist'
                value={searchText}
                onChange={(e) => setSearchText(e?.target?.value)}
                className='form-control search__input search__box'
              />
            </div>
            <div className='artist__list mb-3'>
              {loading ? (
                <div style={{ minHeight: '100px' }} className=' d-flex align-items-center justify-content-center'>
                  <Spinner />
                </div>
              ) : (
                <div>
                  <button onClick={() => onSave({ login: 'null' })} key={`list__artist__login`} className={`artist__select `}>
                    <strong className='name'>____________Select____________</strong>
                    <div className='status'></div>
                  </button>

                  {artists.map((art) => {
                    const doing = (art?.numNewOrder || 0) + (art?.numSketch || 0) + (art?.numSketchEdit || 0) + (art?.numColorEdit || 0) + (art?.numColor || 0);

                    const reviewing = (art?.numSketchReview || 0) + (art?.numColorReview || 0) + (art?.numExportFile || 0);
                    return (
                      <button onClick={() => onSave(art)} key={`list__artist__${art.login}`} className={`artist__select ${art.login === assignedTo?.login ? 'active' : ''}`}>
                        <div className='avt'>
                          <img src={`https://ui-avatars.com/api/?name=${art?.fullName || ''}${art?.firstName || ''}${art?.lastName || ''}`} alt='comments__author' />
                        </div>

                        <div className='info'>
                          <strong className='name'>{art?.fullName || `${art?.firstName} ${art?.lastName}`}</strong>
                          <div className='status'>
                            {art.note && <div className='note text-break'>{`${art.note}`}</div>}
                            <div className='currProgress'>
                              Doing: {doing}, Reviewing: {reviewing}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </div>
    </Modal>
  );
};
const mapStateToProps = ({ orderDetail }) => ({
  isOpen: orderDetail.ui.assignedBox.currentShow === ASSIGNED_MODAL_KEYs.CHANGE_ARTIST,
});

const mapDispatchToProps = {
  updateShowAssignedBoxAction,
  getAssignArtistsAction,
  updateOrderTableAssignArtistAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangeArtistModal);
