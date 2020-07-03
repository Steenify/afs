import { request } from 'utils/request';

const UPLOAD_API = '/api/attachments';

export const uploadService = ({ data, onUploadProgress }) =>
  request({
    url: UPLOAD_API,
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data,
    onUploadProgress,
  });

export const deleteFileService = (id) =>
  request({
    url: `${UPLOAD_API}/${id}`,
    method: 'DELETE',
  });
