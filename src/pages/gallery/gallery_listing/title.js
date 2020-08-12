import React from 'react';
import PageTitle from 'components/common/PageTitle';
import Button from 'components/common/button';
import { ReactComponent as UploadIcon } from 'assets/img/upload_arrow.svg';
import { WEB_ROUTES, PERMITTIONS_CONFIG } from 'configs';
import CanShow from 'components/layout/canshow';

const GalleryTitle = ({ onClickUpload = () => {} }) => {
  return (
    <PageTitle title={WEB_ROUTES.GALLERY_LISTING.title} className='mb-0 mr-3' containerClassName='justify-content-between'>
      <CanShow permission={PERMITTIONS_CONFIG.CREATE_ARTWORK}>
        <Button className='btn-create ml-auto' color='primary' onClick={onClickUpload}>
          <UploadIcon className='mr-2' />
          Upload Gallery
        </Button>
      </CanShow>
    </PageTitle>
  );
};

export default GalleryTitle;
