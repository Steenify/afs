import { request } from 'utils/request';

const PAYOUT_API = '/api/payouts';
const PAYOUT_SUMMARIZE_API = '/api/summarize-payouts';

export const getPayoutsService = (params) =>
  request({
    url: PAYOUT_API,
    method: 'GET',
    params,
  });
export const getPayoutsSummaryService = () =>
  request({
    url: PAYOUT_SUMMARIZE_API,
    method: 'GET',
  });

export const createPayoutService = (data) =>
  request({
    url: PAYOUT_API,
    method: 'POST',
    data,
  });
export const getPayoutDetailService = (id) =>
  request({
    url: `${PAYOUT_API}/${id}`,
    method: 'GET',
  });
