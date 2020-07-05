import { request } from 'utils/request';

const PAYOUT_API = '/api/payouts';

export const getPayoutsService = (params) =>
  request({
    url: PAYOUT_API,
    method: 'GET',
    params,
  });

export const createPayoutService = (data) =>
  request({
    url: PAYOUT_API,
    method: 'POST',
    data,
  });
