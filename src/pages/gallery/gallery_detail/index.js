import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';

import Button from 'components/common/button';
import Layout from 'components/common/Layout';
import WEB_ROUTES from 'configs/web-routes';
import ImageLoadAble from 'components/common/imageLoadAble';
import Tags from '../gallery_listing/tags';
import { ReactComponent as BackArrow } from 'assets/img/left_arrow.svg';
import { ReactComponent as Close } from 'assets/img/close.svg';
import { saveAs } from 'file-saver';
import { getArtworkDetailAction } from './action';
import { showConfirmAlert } from 'utils/index';

import './style.scss';
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
  } = props;

  const { id } = match.params;
  useEffect(() => {
    if (!id) {
      history.goBack();
    } else {
      getArtworkDetailAction(id);
    }
  }, [id, history, getArtworkDetailAction]);

  const onDownload = () => {
    if (gallery?.attachment?.url) {
      saveAs(gallery?.attachment?.url, gallery?.attachment?.fileName || 'gallery image');
    }
  };

  const onConfirmDelete = () => {
    showConfirmAlert({
      title: 'Delete',
      confirmText: 'Delete',
      text: 'Are you sure you want to delete this art work?',
      onConfirm: () => {
        console.log('====================================');
        console.log('DELETE IT');
        console.log('====================================');
      },
    });
  };

  return (
    <Layout documentTitle={WEB_ROUTES.GALLERY_DETAIL.title} container fluid>
      {/* <PageTitle {...WEB_ROUTES.GALLERY_DETAIL} /> */}
      <div className='row pb-3'>
        <div className='col-12'>
          <BackArrow className='cursor-pointer' onClick={() => history.goBack()} />
        </div>
      </div>
      <div className='row'>
        <div className='col col-6'>
          <div className='gallery__artwork detail'>
            {gallery?.attachment && <ImageLoadAble type={gallery?.attachment.type} url={gallery?.attachment?.url} fileName={gallery?.attachment.fileName} />}
          </div>
        </div>

        <div className='col col-6'>
          <div className='d-flex justify-content-between align-items-start'>
            <h1>{gallery?.title}</h1>

            {/* <Button onClick={onConfirmDelete}>Delete</Button> */}
          </div>

          {/* <p>
            Artist:{' '}
            <Link className='ml-1' to={`/artists/${gallery?.artistLogin}`}>
              {gallery?.artistFullName}
            </Link>
          </p> */}

          <div className='gallery mb-3'>{<Tags tags={(gallery?.tags || []).map((item) => item?.name).filter((item) => item)} disable />}</div>

          <div>Download:</div>

          <p>
            <div className='fake__link' onClick={onDownload}>
              {gallery?.attachment?.url}
            </div>
          </p>

          {/* <p>Share feedback, ask questions or leave a comment</p>

          <div className='comment-box'>
            <img className='rounded-circle' src={avatarGenerator(accountInfo?.imageUrl, accountInfo?.firstName)} alt={accountInfo?.firstName} />

            <div className='form-group w-100'>
              <input className='form-control' placeholder='Type a comment...' style={{ borderRadius: '25px' }} />
            </div>
          </div> */}
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
};

export default connect(mapStateToProps, mapDispatchToProps)(GalleryDetail);
