import React from 'react';
import PageTitle from 'components/common/PageTitle';
import Button from 'components/common/button';
import { ReactComponent as UploadIcon } from 'assets/img/upload_arrow.svg';
import { WEB_ROUTES } from 'configs';

const GalleryTitle = ({ onClickUpload = () => {} }) => {
  return (
    <PageTitle title={WEB_ROUTES.GALLERY_LISTING.title} className='mb-0 mr-3' containerClassName='justify-content-between'>
      <Button className='btn-create ml-auto' color='primary' onClick={onClickUpload}>
        <UploadIcon className='mr-2' />
        Upload Gallery
      </Button>
    </PageTitle>
  );
};

export default GalleryTitle;
