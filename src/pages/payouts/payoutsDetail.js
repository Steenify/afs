import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import Layout from 'components/common/Layout';
import PageTitle from 'components/common/PageTitle';
import Button from 'components/common/button';
import { ReactComponent as ArrowLeftIcon } from 'assets/img/chevonRight.svg';

import { getPayoutDetailAction } from './actions';

import { WEB_ROUTES } from 'config';

import { formatMoney } from 'utils';

const PayoutDetail = (props) => {
  const { id } = useParams();
  const { history, getPayoutDetail } = props;

  useEffect(() => {
    getPayoutDetail(id);
  }, [getPayoutDetail, id]);

  const handleBack = () => {
    history.goBack();
  };

  return (
    <Layout documentTitle={WEB_ROUTES.PAYOUTS_DETAIL.title} container fluid>
      <div className='d-flex mt-2 mb-3'>
        <Button
          className='artists__back p-0'
          tag={Link}
          color='link'
          to={WEB_ROUTES.PAYOUTS.path}
          replace>
          <ArrowLeftIcon />
          &nbsp; &nbsp;
          <span className='d-none d-md-inline'>{WEB_ROUTES.PAYOUTS.title}</span>
        </Button>
      </div>

      <PageTitle
        title={WEB_ROUTES.PAYOUTS_DETAIL.title}
        className='mb-4 mr-3'></PageTitle>

      <div className='payouts_detail'>
        <div className='payouts_detail__box box'>
          <div className='payouts_detail__top'>
            <div className='left'>
              <div className='info'>
                <div className='to'>
                  <strong>Payment sent</strong> to
                  <span className='payouts__link'> Birdie Sanders</span>
                </div>
                <div className='date'>02 Oct 2020 at 12:47</div>
                <div className='status'>
                  Payment status: <strong>Complete</strong>
                </div>
              </div>

              <div className='id'>
                Transaction ID: <span>{id}</span>
              </div>
            </div>
            <div className='right'>
              <div className='name'>Amount</div>
              <div className='number'>{formatMoney(1232)}</div>
            </div>
          </div>
          <div className='box__device'></div>
          <div className='payouts_detail__bottom'>
            <div className='row'>
              <div className='col-md-6'>
                <div className='payouts_detail__item'>
                  <div className='payouts_detail__title'>Your Payment</div>

                  <div className='payouts_detail__body'>
                    <div className='row'>
                      <div className='col-6'>
                        <span>#1345</span>
                      </div>
                      <div className='col-6'>
                        <strong>$45.00</strong>
                      </div>
                    </div>

                    <div className='payouts_detail__devider'></div>
                    <div className='row'>
                      <div className='col-6'>
                        <strong>Total</strong>
                      </div>
                      <div className='col-6'>
                        <strong>$45.00</strong>
                      </div>
                    </div>

                    <div className='payouts_detail__devider'></div>
                    <div className='row'>
                      <div className='col-6'>
                        <strong>Payment Sent to</strong>
                      </div>
                      <div className='col-6'>
                        <strong>max_connelly@orville.co.uk</strong>
                      </div>
                    </div>

                    <div className='payouts_detail__devider'></div>
                    <div className='row'>
                      <div className='col-6'>
                        <strong>Note</strong>
                      </div>
                      <div className='col-6'>
                        <p>
                          Paid for the order #1345 (+10$ pose), #1267, #1278,
                          #1251, #1221
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='col-md-6'>
                <div className='payouts_detail__item'>
                  <div className='payouts_detail__title'>Evidence</div>

                  <div className='payouts_detail__body'>a;ld;alsd;</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = {
  getPayoutDetail: getPayoutDetailAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(PayoutDetail);
