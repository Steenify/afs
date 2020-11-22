import React from 'react';
import PageTitle from 'components/common/PageTitle';
import { WEB_ROUTES } from 'configs';

const GalleryTitle = ({ onClickUpload = () => {} }) => {
  return (
    <PageTitle title={WEB_ROUTES.LATE_NOTIFICATION.title} className='mb-0 mr-3 mb-2' containerClassName='justify-content-between'>
      {/* <Button className='btn-create ml-auto pl-4 pr-4' color='primary' onClick={onClickUpload}>
        History
      </Button> */}
    </PageTitle>
  );
};

export default GalleryTitle;
