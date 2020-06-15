import update from 'react-addons-update';
import {
  GET_CUSTOMERGROUPS,
  GET_CUSTOMERGROUP,
  CREATE_CUSTOMERGROUP,
  GET_CUSTOMERS,
  GET_CUSTOMER_DETAIL,
  UPDATE_CUSTOMER,
  UPDATE_SORT_CUSTOMER,
} from './actions';

const initialState = {
  ui: {
    listGroup: {},
    editGroup: {},
    detailGroup: {},
    createGroup: {},
    list: {},
    edit: {},
    detail: {},
    create: {},
  },
  error: {
    listGroup: {},
    editGroup: {},
    detailGroup: {},
    createGroup: {},
    list: {},
    edit: {},
    detail: {},
    create: {},
  },
  data: {
    customerGroups: [],
    customers: [],
    totalItems: 0,
    sortColumns: [],
  },
  detailGroup: {},
  detailCustomer: {},
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_CUSTOMERGROUPS.PENDING:
      return update(state, {});
    case GET_CUSTOMERGROUPS.SUCCESS:
      return update(state, {
        data: {
          customerGroups: { $set: payload.data },
        },
      });
    case GET_CUSTOMERGROUPS.ERROR:
      return update(state, {});

    case GET_CUSTOMERGROUP.PENDING:
      return update(state, {
        ui: {
          detailGroup: {
            loading: { $set: true },
          },
        },
        error: {
          detailGroup: {
            message: { $set: '' },
          },
        },
      });
    case GET_CUSTOMERGROUP.SUCCESS:
      return update(state, {
        ui: {
          detailGroup: {
            loading: { $set: false },
          },
        },
        detailGroup: { $set: payload.data },
      });
    case GET_CUSTOMERGROUP.ERROR:
      return update(state, {
        ui: {
          detailGroup: {
            loading: { $set: false },
          },
        },
        error: {
          detailGroup: {
            message: { $set: (payload && payload.statusText) || '' },
          },
        },
      });

    case CREATE_CUSTOMERGROUP.PENDING:
      return update(state, {
        ui: {
          createGroup: {
            loading: { $set: true },
          },
        },
        error: {
          createGroup: {
            message: { $set: '' },
          },
        },
      });
    case CREATE_CUSTOMERGROUP.SUCCESS:
      return update(state, {
        ui: {
          createGroup: {
            loading: { $set: false },
          },
        },
        detail: { $set: payload.data },
      });
    case CREATE_CUSTOMERGROUP.ERROR:
      return update(state, {
        ui: {
          createGroup: {
            loading: { $set: false },
          },
        },
        error: {
          createGroup: {
            message: { $set: (payload && payload.statusText) || '' },
          },
        },
      });

    case GET_CUSTOMERS.PENDING:
      return update(state, {
        ui: {
          list: {
            loading: { $set: true },
          },
        },
        error: {
          list: {
            message: { $set: '' },
          },
        },
      });
    case GET_CUSTOMERS.SUCCESS:
      return update(state, {
        ui: {
          list: {
            loading: { $set: false },
          },
        },
        data: {
          customers: { $set: payload.data },
        },
      });
    case GET_CUSTOMERS.ERROR:
      return update(state, {
        ui: {
          list: {
            loading: { $set: false },
          },
        },
        error: {
          list: {
            message: { $set: (payload && payload.statusText) || '' },
          },
        },
      });

    case GET_CUSTOMER_DETAIL.PENDING:
      return update(state, {});
    case GET_CUSTOMER_DETAIL.SUCCESS:
      return update(state, {
        detailCustomer: { $set: payload.data },
      });
    case GET_CUSTOMER_DETAIL.ERROR:
      return update(state, {});

    case UPDATE_CUSTOMER.PENDING:
      return update(state, {
        ui: {
          edit: { loading: { $set: true } },
        },
      });
    case UPDATE_CUSTOMER.SUCCESS:
      const newCustomers = [...state.data.customers];
      const index = newCustomers.findIndex(
        (item) => item.login === payload.data.login,
      );
      return update(state, {
        ui: {
          edit: { loading: { $set: false } },
        },
        data: {
          customers: {
            $splice: [[index, 1, payload.data]],
          },
        },
      });
    case UPDATE_CUSTOMER.ERROR:
      return update(state, {
        ui: {
          edit: { loading: { $set: false } },
        },
        error: {
          message: { $set: (payload && payload.statusText) || '' },
        },
      });

    case UPDATE_SORT_CUSTOMER.SUCCESS:
      return update(state, {
        data: {
          sortColumns: { $set: payload },
        },
      });

    default:
      return state;
  }
};

export default reducer;
