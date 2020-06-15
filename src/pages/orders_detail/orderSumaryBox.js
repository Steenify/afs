import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { filter } from 'lodash';
import { Editor } from '@tinymce/tinymce-react';
import { toast } from 'react-toastify';

import ImageGallery from 'components/common/imageGallery';
import Dropbox from 'components/common/dropbox';

import { getListImageUrl } from 'utils';
import { PERMITTIONS_CONFIG } from 'config';

import {
  updateOrderItemSumarizeAction,
  updateOrderItemSumarizeAPIAction,
  updateOrderItemFilesAction,
} from './actions';

const OrderSumaryBox = ({
  item,
  order,
  index,
  updateOrderItemSumarize,
  updateOrderItemSumarizeAPI,
  updateOrderItemFiles,
  accountInfo,
}) => {
  const canEditSumary =
    accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.MODIFY_SUMMARY) ||
    false;

  const [isEdit, setIsEdit] = useState(false);
  const dropbox = useRef(null);

  const handleSave = () => {
    let hasFiles = false;

    if (dropbox.current) {
      const files = dropbox.current.getFiles();
      if (files.length) {
        hasFiles = true;
      }
    }

    if (!hasFiles) {
      const payload = {
        id: item.id,
        summarize: item.summarize,
      };

      updateOrderItemSumarizeAPI(order.id, item.id, payload, () => {
        setIsEdit(false);
      });
    } else {
      const files = dropbox.current.getFiles();
      let isDoneUpload = true;

      files.forEach((file) => {
        if (!file.isUploaded || !file.id) {
          isDoneUpload = false;
        }
      });

      if (!isDoneUpload) {
        toast.warn('Files is uploading!');
        return;
      }

      const data = {
        attachments: files.map((file) => ({ id: file.id })),
      };

      const payload = {
        id: item.id,
        summarize: item.summarize,
      };

      updateOrderItemSumarizeAPI(order.id, item.id, payload, () => {
        updateOrderItemFiles(order.id, item.id, index, data, files, () => {
          setIsEdit(false);
          dropbox.current.clearFiles();
        });
      });
    }
  };

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleChangeSumarize = (e) => {
    updateOrderItemSumarize({
      value: e.target.getContent(),
      index,
    });
  };

  const morePhotos = filter(item.photos, (p) => !p.external);

  return (
    <div className='order_detail__sumary order_detail__box box'>
      <div className='box__header'>
        <div className='box__title'>Summarize</div>
        {canEditSumary && (
          <div className='control'>
            {isEdit ? (
              <button
                type='button'
                onClick={handleSave}
                className='box__control'>
                Save
              </button>
            ) : (
              <button
                type='button'
                onClick={handleEdit}
                className='box__control'>
                Edit
              </button>
            )}
          </div>
        )}
      </div>
      <div className='body'>
        {!isEdit ? (
          <div
            className='desciption rte'
            dangerouslySetInnerHTML={{
              __html: item.summarize || 'Not summarized',
            }}
          />
        ) : (
          <Editor
            apiKey='8yd4ibfq5z8v9bj8ddn2hezmxgm68ijow36krpjasr0ucty8'
            initialValue={item.summarize || ''}
            init={{
              height: 300,
              menubar: false,
              plugins: [
                'advlist autolink lists link image',
                'charmap print preview anchor help',
                'searchreplace visualblocks code',
                'insertdatetime media table paste wordcount',
              ],
              toolbar: `formatselect | bold italic |
            alignleft aligncenter alignright |
            bullist numlist outdent indent`,
            }}
            onChange={handleChangeSumarize}
          />
        )}
      </div>
      <div className='photos'>
        {morePhotos && morePhotos.length > 0 ? (
          <>
            <h3 className='photos__title'>More photo from customer:</h3>
            <ImageGallery
              className='photos__gallery'
              images={getListImageUrl(morePhotos)}
              alt={item.name}
              caption={item.name}
            />
          </>
        ) : null}

        <div className={`photos__upload ${!isEdit && 'd-none'}`}>
          <Dropbox ref={dropbox} id={item.id} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth }) => ({
  accountInfo: auth.data.accountInfo,
});

const mapDispatchToProps = {
  updateOrderItemSumarize: updateOrderItemSumarizeAction,
  updateOrderItemSumarizeAPI: updateOrderItemSumarizeAPIAction,
  updateOrderItemFiles: updateOrderItemFilesAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderSumaryBox);
