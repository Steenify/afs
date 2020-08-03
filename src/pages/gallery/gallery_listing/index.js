import React, { useEffect, useCallback, useRef } from 'react';
import { connect } from 'react-redux';
import { Spinner } from 'reactstrap';
import { debounce } from 'lodash';
import Masonry from 'react-masonry-component';
import { Link, useHistory } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';

import Layout from 'components/common/Layout';
import { getAllTagsAction, getArtworksAction, updateFilterAction } from './action';
import { WEB_ROUTES } from 'config';
import './style.scss';
import { initialState } from './reducer';
import Paging from 'components/common/paging';
import { ReactComponent as Close } from 'assets/img/close.svg';
import Tags from './tags';
import Filter from './filter';
import Title from './title';
import ImageLoadAble from 'components/common/imageLoadAble';
import { useTranslation } from 'react-i18next';
import { uniqIdCreator } from 'utils';
import UploadModal from './uploadModal';

const masonryOptions = {
  transitionDuration: 0,
};

const imagesLoadedOptions = { background: '.my-bg-image-el' };

const Listing = ({ ui = initialState.ui, filterData = initialState.filterData, data = initialState.data, getAllTagsAction, getArtworksAction, updateFilterAction }) => {
  const debounceGetArtworks = useCallback(debounce(getArtworksAction, 500), [getArtworksAction]);
  const history = useHistory();
  const masonryRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    getAllTagsAction();
  }, [getAllTagsAction]);

  useEffect(() => {
    const { page, size, tag, text } = filterData;
    debounceGetArtworks({ page, size, tag, text });
  }, [debounceGetArtworks, filterData]);

  const uploadGalleryAction = (data) => {
    masonryRef.current.performLayout();
    console.log('uploadGalleryAction -> data', data);
  };

  const handleUpload = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return <UploadModal onClose={onClose} onConfirm={uploadGalleryAction} />;
      },
    });
  };

  return (
    <Layout className='order__container' documentTitle={t(WEB_ROUTES.GALLERY_LISTING.title)} container fluid>
      <Title onClickUpload={handleUpload} />
      <div className='gallery gallery__wrapper'>
        <Filter onChange={updateFilterAction} />
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
          <Masonry ref={masonryRef} className={'gallery__wrapper mt-0'} options={masonryOptions} imagesLoadedOptions={imagesLoadedOptions}>
            {data.artworks.map((artwork) => (
              <div className='gallery__artwork' key={`artwork_${artwork.bookingNumber}_${uniqIdCreator()}`}>
                <div className='cursor-pointer' onClick={() => history.push(`/gallery/${artwork.id}`)}>
                  <img src={artwork.attachment.url} alt={artwork.attachment.fileName} />
                  {/* <ImageLoadAble type={artwork.attachment.type} url={artwork.attachment.url} fileName={artwork.attachment.fileName} /> */}
                </div>
                <div className='gallery__artwork__title pl-4' onClick={() => history.push(`/gallery/${artwork.id}`)}>{`#${artwork.bookingNumber} ${artwork.title}`}</div>
                <div className='pl-4'>
                  Artist:
                  <Link className='ml-1' to={`/artists/${artwork.artistLogin}`}>
                    {artwork.artistFullName}
                  </Link>
                </div>
                <div className='pl-4 gallery'>{<Tags tags={artwork.tags.map((item) => item?.name).filter((item) => item)} disable />}</div>
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

const mapStateToProps = ({ gallery: { listing } }) => {
  return { ...listing };
};

const mapDispatchToProps = {
  getAllTagsAction,
  getArtworksAction,
  updateFilterAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Listing);
