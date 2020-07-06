import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from 'components/common/Layout';
import PageTitle from 'components/common/PageTitle';
import Button from 'components/common/button';
import ImageGallery from 'components/common/imageGallery';

import CanShow from 'components/layout/canshow';

import { ReactComponent as ArrowLeftIcon } from 'assets/img/chevonRight.svg';

import { getPayoutDetailAction } from './actions';

import { WEB_ROUTES, PERMITTIONS_CONFIG } from 'config';

import { formatMoney, getListImageUrl, dateTimeToDeadline } from 'utils';

const PayoutDetail = (props) => {
  const { id } = useParams();
  const { history, getPayoutDetail, detail } = props;
  console.log('PayoutDetail -> detail', detail);

  useEffect(() => {
    getPayoutDetail(id);
  }, [getPayoutDetail, id]);

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
          <span>{WEB_ROUTES.PAYOUTS.title}</span>
        </Button>
      </div>

      <PageTitle
        title={WEB_ROUTES.PAYOUTS_DETAIL.title}
        className='mb-4 mr-3 d-none d-md-block'></PageTitle>

      <div className='payouts_detail'>
        <div className='payouts_detail__box box'>
          <div className='payouts_detail__top'>
            <div className='left'>
              <div className='info'>
                <CanShow permission={PERMITTIONS_CONFIG.CREATE_PAYOUT}>
                  <div className='to'>
                    <strong>Payment sent</strong> to
                    <Link to={`/artists/${detail?.artist?.login}`}>
                      <span className='payouts__link'>
                        {` ${detail?.artist?.firstName} ${detail?.artist?.lastName}`}
                      </span>
                    </Link>
                  </div>
                </CanShow>

                <div className='date'>
                  {dateTimeToDeadline(detail?.createdDate)}
                </div>
                <div className='status'>
                  Payment status: <strong>Complete</strong>
                </div>
              </div>

              <div className='id'>
                Transaction ID: <span>{detail?.transactionId}</span>
              </div>
            </div>
            <div className='right'>
              <div className='name'>Amount</div>
              <div className='number'>
                {formatMoney(detail?.totalPaid || 0)}
              </div>
            </div>
          </div>
          <div className='box__device'></div>
          <div className='payouts_detail__bottom'>
            <div className='row'>
              <div className='col-md-6'>
                <div className='payouts_detail__item'>
                  <div className='payouts_detail__title'>Your Payment</div>

                  <div className='payouts_detail__body'>
                    {(detail?.items || []).map((item) => {
                      if (item?.payoutItemType === 'EXTRA_PAYMENT') {
                        return (
                          <div
                            key={`payout__detail__item__${item.id}`}
                            className='row payouts_detail__order'>
                            <div className='col-6'>
                              <span className='label'>Extra</span>
                            </div>
                            <div className='col-6'>
                              <strong className='value'>
                                {formatMoney(item?.paid)}
                              </strong>
                            </div>
                          </div>
                        );
                      }

                      return (
                        <div
                          key={`payout__detail__item__${item.id}`}
                          className='row payouts_detail__order'>
                          <div className='col-6 '>
                            <Link to={`/order/${item?.booking?.code}`}>
                              <span className='label'>
                                #{item?.booking?.number}
                              </span>
                            </Link>
                          </div>
                          <div className='col-6'>
                            <strong className='value'>
                              {formatMoney(item?.paid)}
                            </strong>
                          </div>
                        </div>
                      );
                    })}

                    <div className='payouts_detail__devider'></div>
                    <div className='row payouts_detail__order'>
                      <div className='col-6'>
                        <strong className='value'>Total</strong>
                      </div>
                      <div className='col-6'>
                        <strong className='value'>
                          {formatMoney(detail?.totalPaid)}{' '}
                        </strong>
                      </div>
                    </div>

                    <div className='payouts_detail__devider'></div>
                    <div className='row payouts_detail__order'>
                      <div className='col-6'>
                        <strong className='value'>Payment Sent to</strong>
                      </div>
                      <div className='col-6'>
                        <strong className='value'>
                          {detail?.artist?.email}
                        </strong>
                      </div>
                    </div>

                    <div className='payouts_detail__devider'></div>
                    <div className='row payouts_detail__order'>
                      <div className='col-6'>
                        <strong className='value'>Note</strong>
                      </div>
                      <div className='col-6'>
                        <p>{detail?.note}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='col-md-6'>
                <div className='payouts_detail__item'>
                  <div className='payouts_detail__title'>Evidence</div>
                  <div className='payouts_detail__body'>
                    <div className='payouts_detail__photos'>
                      <ImageGallery
                        images={getListImageUrl(detail?.attachments || [])}
                        alt={`payout`}
                        caption={'payout'}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = ({ payouts }) => ({
  detail: payouts.detail,
});

const mapDispatchToProps = {
  getPayoutDetail: getPayoutDetailAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(PayoutDetail);
