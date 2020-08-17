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
import { getArtworkDetailAction, deleteArtworkDetailAction } from './action';
import { showConfirmAlert } from 'utils/index';
import MeatBallDropdown from 'components/common/meatball-dropdown';

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
    getArtworkDetailAction,
    deleteArtworkDetailAction,
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
    console.log('GalleryDetail -> script', script);
    script.async = true;
    script.defer = true;
    script.crossOrigin = 'anonymous';
    script.nonce = 'arO05les';
    script.src = `https://connect.facebook.net/en_US/sdk.js#xfbml=1&autoLogAppEvents=1&version=v8.0&appId=${FACEBOOK_APP_ID}`;
    // const metaAppId = document.createElement('meta')

    document.body.appendChild(fbRoot);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      document.body.removeChild(fbRoot);
      window?.FB && delete window.FB;
    };
  }, []);

  useEffect(() => {
    window?.FB?.XFBML?.parse && window.FB.XFBML.parse();
  });

  useEffect(() => {
    if (!id) {
      history.goBack();
    } else {
      getArtworkDetailAction(id);
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
      title: 'Download',
      onClick: onDownload,
      show: gallery?.destinationLink,
    },
    {
      title: 'Delete',
      onClick: onConfirmDelete,
      show: accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.DELETE_ARTWORK) || false,
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
            <h1>{gallery?.title}</h1>
            {actions.length > 0 && <MeatBallDropdown direction='left' className='mr-3' actions={actions} />}
          </div>

          <div className='gallery mb-3'>
            <div>
              <Tags tags={(gallery?.tags || []).map((item) => item?.name).filter((item) => item)} disable />
            </div>
            <div className='description'>{gallery?.description}</div>
          </div>

          <div class='fb-comments' data-colorscheme='dark' data-href='https://test-ref.org.abc/3243234234/123131/' data-numposts='5' data-width='100%'></div>
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = ({ auth, gallery: { detail } }, ownProps) => ({
  ...ownProps,
  auth,
  galleryDetailReducer: detail,
});

const mapDispatchToProps = {
  getArtworkDetailAction,
  deleteArtworkDetailAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(GalleryDetail);
