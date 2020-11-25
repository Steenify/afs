import { request } from 'utils/request';

const PRODUCT_API = '/api/products';
const COLLECTION_API = '/api/collections';

export const getProductsService = (params) =>
  request({
    url: PRODUCT_API,
    method: 'GET',
    params,
  });

export const applyWorkflowForProductService = (data) =>
  request({
    url: `${PRODUCT_API}/flow`,
    method: 'POST',
    data,
  });

export const getProductCollectionService = (params) =>
  request({
    url: COLLECTION_API,
    method: 'GET',
    params,
  });
