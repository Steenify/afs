import React from 'react';
import moment from 'moment';
// import numeral from 'numeral';
import { toast } from 'react-toastify';
import { reduce, map, isObject, mapValues, omit } from 'lodash';
import * as Sentry from '@sentry/react';

import PSDFile from 'assets/img/psd__icon.jpg';
import { ReactComponent as Close } from 'assets/img/close.svg';
import { confirmAlert } from 'react-confirm-alert';

export const storeData = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.log('storeData', error);
  }
};

export const getData = (key) => {
  let res = '';
  try {
    res = localStorage.getItem(key);
  } catch (error) {
    console.log('getData', error);
  }
  return res;
};

export const actionCreator = (actionName, extraField = []) => {
  const actionType = {
    NAME: actionName,
    PENDING: `${actionName}_PENDING`,
    SUCCESS: `${actionName}_SUCCESS`,
    ERROR: `${actionName}_ERROR`,
  };
  extraField.forEach((field) => {
    actionType[field] = `${actionName}_${field}`;
  });

  return actionType;
};

export const actionTryCatchCreator = async ({ service, onPending, onSuccess, onError, ignoreError }) => {
  const isIgnoreError = ignoreError || false;
  try {
    if (onPending) onPending();
    const { status, data, headers } = await service;
    if (status === 401) {
      storeData('token', '');
      window.location.href = '/signin';
      return;
    }
    if (status >= 200 && status < 300) {
      if (onSuccess) onSuccess(data, headers, status);
    } else {
      throw String(`HTTP request with code ${status} \n ${data.detail || data.message || ''}`);
    }
  } catch (error) {
    console.log('error', JSON.stringify(error));

    if (onError) onError(error);
    if (isIgnoreError) {
      return;
    }
    if (typeof error === 'object') {
      const status = error?.response?.status;
      const isUnAuthen = status === 401;

      if (isUnAuthen) {
        storeData('token', '');
        window.location.href = '/signin';
        return;
      }

      const messages = error?.name || error?.response?.data?.title || '';

      toast.error(`${messages} \n ${error?.response?.data?.detail || error?.response?.data?.message || ''}`);
    } else {
      toast.error(error);
    }

    const token = getData('token') || '';
    Sentry.configureScope((scope) => scope.setUser({ token }).setLevel('API ERROR'));
    Sentry.captureException(error);
  }
};

export const dateFormatString = 'DD/MM/YYYY';
export const timeFormatString = 'hh:mm';

export const dateStringFromDate = (date) => moment(date).format(dateFormatString);

export const timeStringFromDate = (date) => moment(date).format(timeFormatString);

export const dateTimeStringFromDate = (date) => moment(date).format(`${dateFormatString} ${timeFormatString}`);

export const dateTimeFromNow = (date) => moment(date).fromNow();
export const dateTimeToDeadline = (date) => moment().to(date);

export const chunk = (inputArray = [], perChunk = 1) => {
  const result = inputArray.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / perChunk);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []; // start a new chunk
    }

    resultArray[chunkIndex].push(item);

    return resultArray;
  }, []);

  return result;
};

export const getUUID = () => ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) => (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16));

const getUrlParameter = (name, search) => {
  const url = new URL('http://localhost' + search); // using a dummy url for parsing
  return url.searchParams.get(name) || '';
};

export const getSortState = (location, itemsPerPage) => {
  let pageParam = getUrlParameter('page', location.search);
  let sortParam = getUrlParameter('sort', location.search);
  let sort = 'id';
  let order = 'asc';
  let activePage = 1;
  if (pageParam !== '' && !isNaN(parseInt(pageParam, 10))) {
    activePage = parseInt(pageParam, 10);
  }
  if (sortParam !== '') {
    sort = sortParam.split(',')[0];
    order = sortParam.split(',')[1];
  }
  return {
    itemsPerPage: itemsPerPage,
    sort: sort,
    order: order,
    activePage: activePage,
  };
};

export const getPaginationItemsNumber = (totalItems, itemsPerPage) => {
  const division = Math.floor(totalItems / itemsPerPage);
  const modulo = totalItems % itemsPerPage;
  return division + (modulo !== 0 ? 1 : 0);
};

export const getErrorMessage = (status, errorKey, message) => {
  let errorMessage = '';
  errorMessage = message;
  return errorMessage;
};

export const buildSearchParam = (input = {}) => {
  var params = new URLSearchParams();
  params.append('page', input.page || 0);
  params.append('size', (typeof input.size === 'number' && parseInt(input.size)) || 20);

  if (input.sort && input.sort.length) {
    input.sort.forEach((item) => {
      const textSort = item.id + ',' + (item.desc ? 'desc' : 'asc');
      params.append('sort', textSort);
    });
  }

  if (input.sortBy && input.sortBy.length) {
    input.sortBy.forEach((item) => {
      const textSort = item.id + ',' + (item.desc ? 'desc' : 'asc');
      params.append('sort', textSort);
    });
  }

  const newInput = omit(input, ['page', 'size', 'sort', 'sortBy']);

  Object.keys(newInput).forEach((key) => {
    params.append(key, `${newInput[key]}`);
  });

  return params;
};

export const getOrderItem = (name) => {
  const res = name.split('-');
  return res[0];
};

export const getOrderOption = (name) => {
  const res = name.split('-');
  return res[1];
};

export const getListImageUrl = (list = []) => {
  return list.map((item) => {
    if (item.fileName && item.fileName.toLowerCase().indexOf('.psd') !== -1) {
      return {
        download: PSDFile,
        fullscreen: PSDFile,
        regular: PSDFile,
        thumbnail: PSDFile,
        type: item?.fileType,
        fileName: item?.fileName,
        id: item?.id,
      };
    }
    if (item.thumbnailLink) {
      return {
        download: item?.url,
        fullscreen: item?.url,
        regular: item?.url,
        thumbnail: item?.thumbnailLink,
        type: item?.fileType,
        fileName: item?.fileName,
        id: item?.id,
      };
    }

    return {
      download: item?.url,
      fullscreen: item?.url,
      regular: item?.url,
      thumbnail: item?.url,
      type: item?.fileType,
      fileName: item?.fileName,
      id: item?.id,
    };
  });
};

export const countTotalOrders = (orderStatus) => {
  return reduce(
    orderStatus,
    (res, value, key) => {
      if (key !== 'DONE' && key !== 'NO_ACTIVITY' && key !== 'LATE_WORK_LOG_DEADLINE') {
        return (res += value);
      }
      return res;
    },
    0,
  );
};

export const getSelectedStatus = (name, status) => {
  const StatusMap = {};
  status.forEach((sta) => {
    StatusMap[sta.name] = sta;
  });
  return StatusMap[name] || {};
};

export const mapDataList = (list, name, value) => {
  if (!isObject(list)) {
    return map(list, (item) => {
      return {
        ...item,
        [name]: value,
      };
    });
  } else {
    return mapValues(list, (item) => ({ ...item, [name]: value }));
  }
};

export const renderHTML = (text) => {
  if (!text) {
    return '';
  }
  var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
  return text.replace(urlRegex, function (url) {
    if (url.indexOf('.jpg') > 0 || url.indexOf('.png') > 0 || url.indexOf('.gif') > 0) {
      return '<img alt="TN_ARTST" src="' + url + '">';
    } else {
      return '<a target="_blank" rel="noreferrer" href="' + url + '">' + url + '</a>';
    }
  });
};

let UUID_COUNT = 0;
export const getUniqueID = () => {
  UUID_COUNT += 1;
  return `UUID_${UUID_COUNT}`;
};

// export const formatMoney = (input) => numeral(input).format('0,0');

export const formatMoney = (input) => {
  return new Intl.NumberFormat('en-EN', {
    style: 'currency',
    currency: 'USD',
  }).format(isNaN(input) ? 0 : input);
};

export const formatNumber = (amount, decimalCount = 2, decimal = '.', thousands = ',') => {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? '-' : '';

    let i = parseInt((amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))).toString();
    let j = i.length > 3 ? i.length % 3 : 0;

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : '') +
      i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : '')
    );
  } catch (e) {
    console.log(e);
  }
};

export const checkImageLoadable = ({ url, onError, onSuccess }) => {
  if (!url) {
    onError();
    return;
  }
  const img = new Image();
  img.onerror = onError;
  img.onabort = onError;
  img.onload = onSuccess;
  img.src = url;
};

export const mapDataByIds = (list = [], field) => {
  const res = reduce(
    list,
    (total, item) => {
      total.ids.push(item[field]);
      total.items[item[field]] = item;
      return total;
    },
    {
      ids: [],
      items: {},
    },
  );
  return res;
};

export const mapDataByDate = (list = [], field) => {
  const res = reduce(
    list,
    (groups, item) => {
      const date = item[field].split('T')[0];
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(item.id);
      return groups;
    },
    {},
  );

  const groupArrays = Object.keys(res).map((date) => {
    return {
      date,
      items: res[date],
    };
  });

  groupArrays.sort(function (a, b) {
    return new Date(b.date) - new Date(a.date);
  });

  return groupArrays;
};

export const prettyDate = (string) => {
  return moment(string).fromNow();
};

export const truncates = (string, maxLength = 50) => {
  if (!string) return null;
  if (string.length <= maxLength) return string;
  return `${string.substring(0, maxLength)}...`;
};

export const isMobile = () => {
  return window.innerWidth < 780;
};

export const getTotalPage = (headers = {}, size = 100, sizeMobile = 100) => {
  const totalItems = parseInt(headers['x-total-count'], 10);
  const currSize = isMobile() ? sizeMobile : size;
  return Math.ceil(totalItems / currSize);
};

export const uniqIdCreator = () => Math.random().toString(36).slice(2);

export const avatarGenerator = (url, name) => url || `https://ui-avatars.com/api/?name=${(name || 'Unknown').split(' ').join('+')}`;

export const showConfirmAlert = ({ title = 'Confirm', text = '', confirmText = 'Confirm', cancelText = 'Cancel', onConfirm = () => {}, onCancel = () => {} }) => {
  confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div className='comfirm_cus'>
          <div className='comfirm_cus__header'>
            <div className='comfirm_cus__titl'>{title}</div>
            <button type='button' onClick={onClose} className='comfirm_cus__close'>
              <div className='icon'>
                <Close />
              </div>
            </button>
          </div>
          <div className='comfirm_cus__body'>
            <p>{text}</p>
          </div>
          <div className='comfirm_cus__footer text-right'>
            <button
              className='comfirm_cus__cancel comfirm_cus__control'
              onClick={() => {
                onCancel();
                onClose();
              }}>
              {cancelText}
            </button>
            <button
              className='comfirm_cus__accept comfirm_cus__control'
              onClick={() => {
                onConfirm();
                onClose();
              }}>
              {confirmText}
            </button>
          </div>
        </div>
      );
    },
  });
};
