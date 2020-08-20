import React, { useEffect, useCallback, useRef } from 'react';
import { connect } from 'react-redux';
import { Spinner } from 'reactstrap';
import { debounce } from 'lodash';
import Masonry from 'react-masonry-component';
import { useHistory } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faPen } from '@fortawesome/free-solid-svg-icons';

import Button from 'components/common/button';
import Layout from 'components/common/Layout';
import { getAllTagsAction, getArtworksAction, updateFilterAction, addArtworksAction, resetAction } from './action';
import { WEB_ROUTES, PERMITTIONS_CONFIG } from 'configs/index';
import './style.scss';
import { initialState } from './const';
import Paging from 'components/common/paging';
import Tags from './tags';
import Filter from './filter';
import Title from './title';
import { useTranslation } from 'react-i18next';
import { uniqIdCreator } from 'utils';
import UploadModal from './uploadModal';
import { toast } from 'react-toastify';
import 'react-lazy-load-image-component/src/effects/blur.css';
import ActionableImage from './preview';

const masonryOptions = {
  transitionDuration: 0,
};

const imagesLoadedOptions = { background: '.my-bg-image-el' };

const Listing = ({
  ui = initialState.ui,
  filterData = initialState.filterData,
  data = initialState.data,
  isMenuOpen = false,
  permissions = [],
  login = '',

  getAllTagsAction,
  getArtworksAction,
  updateFilterAction,
  addArtworksAction,
  resetAction,
}) => {
  const debounceGetArtworks = useCallback(debounce(getArtworksAction, 500), [getArtworksAction]);
  const history = useHistory();
  const masonryRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    getAllTagsAction();
  }, [getAllTagsAction]);

  useEffect(() => {
    setTimeout(() => masonryRef.current?.performLayout?.(), 200);
  }, [isMenuOpen]);

  useEffect(() => {
    return () => {
      resetAction();
    };
  }, []);

  useEffect(() => {
    const { page, size, tag, text } = filterData;
    debounceGetArtworks({ page, size, tag, text });
  }, [debounceGetArtworks, filterData]);

  const uploadGalleryAction = (data, callback) => {
    addArtworksAction(data, () => {
      const { page, size, tag, text } = filterData;
      debounceGetArtworks({ page, size, tag, text });
      getAllTagsAction();
      callback && callback();
    });
  };

  const handleUpload = (item) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <UploadModal item={item} isLoading={ui.isUploading} onClose={onClose} onConfirm={uploadGalleryAction} tagItems={data.tagItems.map(({ id = 0, name = '' }) => ({ label: name, value: id }))} />
        );
      },
    });
  };

  const goToDetail = (id) => {
    history.push(`/gallery/${id}`);
  };

  const onDownload = (destinationLink) => {
    destinationLink && window.open(destinationLink, '_blank');
  };

  return (
    <Layout className='order__container' documentTitle={t(WEB_ROUTES.GALLERY_LISTING.title)} container fluid>
      <Title onClickUpload={() => handleUpload()} />
      <div className='gallery gallery__wrapper'>
        <Filter onChange={updateFilterAction} text={filterData.text} />
        <Tags currentTag={filterData.tag} tags={data?.tags} onClickTag={updateFilterAction} />
      </div>
      {ui.loading ? (
        <div className={`position-relative mb-3`}>
          <div className={`in-page-loading`}>
            <Spinner /> <span className='text'>Loading</span>
          </div>
        </div>
      ) : (
        <>
          <Masonry ref={masonryRef} className={'gallery gallery__wrapper mt-0'} options={masonryOptions} imagesLoadedOptions={imagesLoadedOptions} enableResizableChildren={true}>
            {data.artworks.map((artwork) => (
              <div className='gallery__artwork' key={`artwork_${artwork.bookingNumber}_${uniqIdCreator()}`}>
                <div className='cursor-pointer' onClick={() => goToDetail(artwork.id)}>
                  <ActionableImage effect='opacity' src={artwork.attachment.url} alt={artwork.attachment.fileName} width={255} wrapperClassName='gallery__artwork__lazy'>
                    {artwork?.createdBy && artwork.createdBy === login && permissions.includes(PERMITTIONS_CONFIG.UPDATE_ARTWORK) && (
                      <Button
                        color='primary'
                        className='button__edit'
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUpload(artwork);
                        }}>
                        <FontAwesomeIcon icon={faPen} size='xs' color='white' className='cursor-pointer mr-2' />
                        Edit
                      </Button>
                    )}
                    {artwork?.destinationLink && (
                      <Button
                        color='primary'
                        className='button__download'
                        onClick={(e) => {
                          e.stopPropagation();
                          onDownload(artwork?.destinationLink);
                        }}>
                        <FontAwesomeIcon icon={faDownload} size='xs' color='white' className='cursor-pointer mr-2' />
                        Download
                      </Button>
                    )}
                  </ActionableImage>
                </div>
                <div className=' gallery mt-2'>{<Tags tags={artwork.tags.map((item) => item?.name).filter((item) => item)} disable />}</div>
                <Button tag={Link} className='w-100 pl-0 justify-content-start gallery__artwork__title ' to={`/gallery/${artwork.id}`} color='link'>
                  {artwork.title}
                </Button>
                {artwork?.description && <div className=' description-clip'>{artwork?.description}</div>}
              </div>
            ))}
          </Masonry>
          <div className='d-flex justify-content-center'>
            <Paging items={data.totalPage} activePage={filterData.page + 1} onSelect={(p) => updateFilterAction({ page: p - 1 })} />
          </div>
        </>
      )}
    </Layout>
  );
};

const mapStateToProps = ({
  gallery: { listing },
  global: {
    ui: { isMenuOpen = false },
  },
  auth: {
    data: {
      accountInfo: { login = '', permissions = [] },
    },
  },
}) => {
  return { ...listing, isMenuOpen, login, permissions };
};

const mapDispatchToProps = {
  getAllTagsAction,
  getArtworksAction,
  updateFilterAction,
  addArtworksAction,
  resetAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Listing);
