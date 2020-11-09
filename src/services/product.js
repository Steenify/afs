import { request } from 'utils/request';

const PRODUCT_API = '/api/products';

export const getProductsService = (params) =>
  request({
    url: PRODUCT_API,
    method: 'GET',
    params,
  });
