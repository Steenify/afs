import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import Layout from 'components/common/Layout';
import Button from 'components/common/button';

import { ReactComponent as ArrowLeftIcon } from 'assets/img/arrowleft.svg';

import {} from './actions';

import { WEB_ROUTES } from 'configs';

const ArtistDetail = () => {
  let { login } = useParams();
  console.log('ArtistDetail -> login', login);

  useEffect(() => {}, []);

  return (
    <Layout documentTitle={WEB_ROUTES.CS_DETAIL.title} container fluid>
      <div className='d-flex mt-2 mb-3'>
        <Button className='artists__back' tag={Link} color='link' to={WEB_ROUTES.CS.path} replace>
          <ArrowLeftIcon />
          &nbsp; &nbsp;
          <span className='d-none d-md-inline'>{WEB_ROUTES.CS.title}</span>
        </Button>
      </div>

      <div className='artists__title'>Lina Copeland</div>
      <div className='artists__box box'>
        <div className='info'>
          <div className='row'>
            <div className='col-md-4'>
              <div className='info__item'>
                <div className='info__title'>Status</div>
                <div className='info__body'>
                  <div>Progress: 5 orders</div>
                  <div>Processed: 13 orders</div>
                </div>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='info__item'>
                <div className='info__title'>CONTACT</div>
                <div className='info__body'>
                  <div>lina.copeland@gmail.com</div>
                  <div>facebook.com/username</div>
                  <div>+1 916-335-9087</div>
                </div>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='info__item'>
                <div className='info__title'>Lina Copeland</div>
                <div className='info__body'>
                  <p>Progress: 5 orders</p>
                  <p>Processed: 13 orders</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistDetail);
