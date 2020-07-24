import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Layout from 'components/common/Layout';
import PageTitle from 'components/common/PageTitle';
import { useTranslation } from 'react-i18next';
import Button from 'components/common/button';
import { ReactComponent as UploadIcon } from 'assets/img/upload_arrow.svg';
import { getAllTagsAction, getArtworksAction } from './action';
import { WEB_ROUTES } from 'config';
import './style.scss';

const mockTags = new Array(20).fill('_').map((_, index) => `Naruto ${index}`);

const Listing = ({ getAllTagsAction, getArtworksAction }) => {
  const { t } = useTranslation();

  useEffect(() => {
    getAllTagsAction();
  }, []);
  return (
    <Layout
      className='order__container'
      documentTitle={WEB_ROUTES.GALLERY_LISTING.title}
      container
      fluid>
      <PageTitle title={WEB_ROUTES.GALLERY_LISTING.title} className='mb-0 mr-3'>
        <Button className='btn-create ml-auto' color='primary'>
          <UploadIcon className='mr-2' />
          Upload Gallery
        </Button>
      </PageTitle>
      <div className='gallery__wrapper'>
        <div className='gallery__filter'>
          <input
            type='text'
            // value={text}
            placeholder='Search for order number, artist name, anime...'
            className='search__box form-control bg-white'
            // onChange={this.handleChangeText}
          />
        </div>
        <div className='d-flex mt-3 overflow-hidden'>
          {mockTags.map((text) => (
            <button className='tag_item active' key={text} color='primary'>
              {text}
            </button>
          ))}
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = ({ order, auth }) => {
  return {};
};

const mapDispatchToProps = {
  getAllTagsAction,
  getArtworksAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Listing);
