import { request } from 'utils/request';

const API = {
  AUTHENTICATE_TOKEN: '/api/authenticate/token',
};

export const authenticateTokenService = token => request({
  url: API.AUTHENTICATE_TOKEN,
  method: 'POST',
  data: { token },
});
