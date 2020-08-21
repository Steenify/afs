import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import { Helmet } from 'react-helmet';
import Button from 'components/common/button';
import Layout from 'components/common/Layout';
import WEB_ROUTES from 'configs/web-routes';
import ImageLoadAble from 'components/common/imageLoadAble';
import Tags from '../gallery_listing/tags';
import { ReactComponent as BackArrow } from 'assets/img/left_arrow.svg';
import { ReactComponent as Close } from 'assets/img/close.svg';
import { saveAs } from 'file-saver';
import { getArtworkDetailAction, deleteArtworkDetailAction, resetArtworkAction } from './action';
import { showConfirmAlert } from 'utils/index';
import MeatBallDropdown from 'components/common/meatball-dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

import UploadModal from '../gallery_listing/uploadModal';
import { getAllTagsAction, addArtworksAction } from '../gallery_listing/action';

import './style.scss';
import { PERMITTIONS_CONFIG, FACEBOOK_APP_ID } from 'configs';
import { toast } from 'react-toastify';
// import { avatarGenerator } from 'utils';

const GalleryDetail = (props) => {
  const {
    history,
    match,
    auth: {
      data: { accountInfo },
    },
    galleryDetailReducer: {
      data: { gallery },
    },
    isUploading,
    tagItems,
    getArtworkDetailAction,
    deleteArtworkDetailAction,
    resetArtworkAction,
    getAllTagsAction,
    addArtworksAction,
  } = props;

  const { id } = match.params;

  useEffect(() => {
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: FACEBOOK_APP_ID,
        autoLogAppEvents: true,
        xfbml: true,
        version: `v${8.0}`,
      });
    };
    const fbRoot = document.createElement('div');
    fbRoot.id = 'fb-root';
    const script = document.createElement('script');

    script.async = true;
    script.defer = true;
    script.crossOrigin = 'anonymous';
    script.nonce = 'arO05les';
    script.src = `https://connect.facebook.net/en_US/sdk.js#xfbml=1&autoLogAppEvents=1&version=v8.0&appId=${FACEBOOK_APP_ID}`;
    // const metaAppId = document.createElement('meta')

    document.body.appendChild(fbRoot);
    document.body.appendChild(script);

    return () => {
      resetArtworkAction();
      document.body.removeChild(script);
      document.body.removeChild(fbRoot);
      window?.FB && delete window.FB;
    };
  }, []);

  useEffect(() => {
    window?.FB?.XFBML?.parse && window.FB.XFBML.parse();
  });

  const uploadGalleryAction = (data, callback) => {
    addArtworksAction(data, () => {
      // getArtworkDetailAction(id);
      // getAllTagsAction();
      callback && callback();
    });
  };

  const handleUpload = (item) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <UploadModal item={gallery} isLoading={isUploading} onClose={onClose} onConfirm={uploadGalleryAction} tagItems={tagItems.map(({ id = 0, name = '' }) => ({ label: name, value: id }))} />
        );
      },
    });
  };

  useEffect(() => {
    if (!id) {
      history.goBack();
    } else {
      getArtworkDetailAction(id);
      getAllTagsAction();
    }
  }, [id, history, getArtworkDetailAction]);

  const onDownload = () => {
    window.open(gallery?.destinationLink, '_blank');
  };

  const onConfirmDelete = () => {
    showConfirmAlert({
      title: 'Delete',
      confirmText: 'Delete',
      text: 'Are you sure you want to delete this art work?',
      onConfirm: () => {
        deleteArtworkDetailAction(id, () => {
          toast.dark('Art work is deleted!');
          history.goBack();
        });
      },
    });
  };
  const actions = [
    {
      title: 'Edit',
      onClick: handleUpload,
      show: accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.UPDATE_ARTWORK) || accountInfo?.login === gallery?.createdBy,
    },
    {
      title: 'Delete',
      onClick: onConfirmDelete,
      show: accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.DELETE_ARTWORK) || accountInfo?.login === gallery?.createdBy,
    },
  ].filter(({ show }) => show);

  return (
    <Layout documentTitle={WEB_ROUTES.GALLERY_DETAIL.title} container fluid>
      <Helmet>
        <meta property='fb:app_id' content={FACEBOOK_APP_ID} />
      </Helmet>
      <div className='row pb-3'>
        <div className='col-12'>
          <BackArrow className='cursor-pointer' onClick={() => history.goBack()} />
        </div>
      </div>
      <div className='row'>
        <div className='col-lg-6 col-md-12'>
          <div className='gallery__artwork detail'>
            {gallery?.attachment && <ImageLoadAble type={gallery?.attachment.type} url={gallery?.attachment?.url} fileName={gallery?.attachment.fileName} />}
          </div>
        </div>

        <div className='col-lg-6 col-md-12'>
          <div className='d-flex justify-content-between align-items-start'>
            <h1 className='mb-0'>{gallery?.title}</h1>
            {actions.length > 0 && <MeatBallDropdown direction='left' className='mr-3' actions={actions} />}
          </div>

          <div className='gallery mb-3'>
            <div className='description'>{gallery?.description}</div>
            <div>
              <Tags tags={(gallery?.tags || []).map((item) => item?.name).filter((item) => item)} disable />
            </div>
            {gallery?.destinationLink && (
              <Button color='primary' className='mt-3' onClick={onDownload}>
                <FontAwesomeIcon icon={faDownload} size='xs' color='white' className='cursor-pointer mr-2' />
                Download
              </Button>
            )}
          </div>

          <div class='fb-comments' data-colorscheme='dark' data-numposts='5' data-width='100%'></div>
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = ({ auth, gallery: { detail, listing } }, ownProps) => ({
  ...ownProps,
  auth,
  galleryDetailReducer: detail,
  isUploading: listing?.ui?.isUploading || false,
  tagItems: listing?.data?.tagItems || [],
});

const mapDispatchToProps = {
  getArtworkDetailAction,
  deleteArtworkDetailAction,
  resetArtworkAction,
  getAllTagsAction,
  addArtworksAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(GalleryDetail);
