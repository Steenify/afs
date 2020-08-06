import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from 'components/common/Layout';
import WEB_ROUTES from 'configs/web-routes';
import PageTitle from 'components/common/PageTitle';
import ImageLoadAble from 'components/common/imageLoadAble';
import Tags from '../gallery_listing/tags';

import { getArtworkDetailAction } from './action';

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

  return (
    <Layout documentTitle={WEB_ROUTES.GALLERY_DETAIL.title} container fluid onGoBack={() => history.goBack()}>
      <PageTitle {...WEB_ROUTES.GALLERY_DETAIL} />

      <div className='row'>
        <div className='col col-6'>
          <div className='gallery__artwork detail'>
            {gallery?.attachment && <ImageLoadAble type={gallery?.attachment.type} url={gallery?.attachment?.url} fileName={gallery?.attachment.fileName} />}
          </div>
        </div>

        <div className='col col-6'>
          <h1>
            #{gallery?.bookingNumber} {gallery?.title}
          </h1>

          <p>
            Artist:{' '}
            <Link className='ml-1' to={`/artists/${gallery?.artistLogin}`}>
              {gallery?.artistFullName}
            </Link>
          </p>

          <div className='gallery mb-3'>{<Tags tags={(gallery?.tags || []).map((item) => item?.name).filter((item) => item)} disable />}</div>

          <div>Download:</div>

          <p>
            <a href={gallery?.attachment?.url} download>
              {gallery?.attachment?.url}
            </a>
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
