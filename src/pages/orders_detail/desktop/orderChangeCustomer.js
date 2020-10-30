import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { toast } from 'react-toastify';
import Popover from 'react-tiny-popover';

import { ReactComponent as Pencil } from 'assets/img/pencil.svg';
import ListCustomters from 'components/layout/listCustomers';

import { setOrderCustomerBookingAction } from 'pages/orders_detail/actions';

class OrderChangeCustomer extends Component {
  constructor() {
    super();
    this.state = {
      isPopoverOpen: false,
    };
  }

  toggle = () => {
    this.setState((prevState) => ({
      isPopoverOpen: !prevState.isPopoverOpen,
    }));
  };

  onSave = (cus) => {
    console.log('OrderChangeCustomer -> onSave -> cus', cus);
    const { isPopoverOpen } = this.state;
    const { customer, order, setOrderCustomerBooking } = this.props;

    if ((customer || {})['login'] === cus?.login) {
      toast.warn('Please select new customer!');
      return;
    }

    if (isEmpty(cus)) {
      toast.warn('Please select customer');
      return;
    }

    this.setState(
      {
        isPopoverOpen: !isPopoverOpen,
      },
      () => {
        const payload = { login: cus?.login || '' };
        const name = `${cus?.firstName} ${cus?.lastName}`;

        setOrderCustomerBooking(payload, order?.id, () => {
          toast.dark(`Order [#${order?.number}] is change to [${name}]`);
        });
      },
    );
  };

  render() {
    const { customer } = this.props;

    const { isPopoverOpen } = this.state;

    if (isEmpty(customer)) {
      return null;
    }

    return (
      <div className='order_detail__assigned mr-3'>
        <Popover
          isOpen={isPopoverOpen}
          position={'bottom'}
          transitionDuration={0.000001}
          padding={10}
          onClickOutside={this.toggle}
          content={() => <ListCustomters onSave={this.onSave} currentCustomer={customer} />}>
          <button type='button' onClick={this.toggle} className='order__toggle order__assigned assign__artist budget p-0'>
            <div className='d-flex align-items-end'>
              <strong className='mr-2'> Current Customer:</strong>
              <span className='name'>{`${customer?.fullName || ''}` || `${customer?.firstName || ''} ${customer?.lastName || ''}`}</span>
              <span className='icon d-block ml-1'>
                <Pencil width='14px' height='14px' />
              </span>
            </div>
          </button>
        </Popover>
      </div>
    );
  }
}

const mapStateToProps = ({ orderDetail }) => ({
  order: orderDetail.data.order,
});

const mapDispatchToProps = {
  setOrderCustomerBooking: setOrderCustomerBookingAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderChangeCustomer);
