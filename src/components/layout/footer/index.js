/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { WEB_ROUTES } from 'config';

import './style.scss';

const Footer = (props) => {
  const { className } = props;
  return (
    <Fragment>
      <footer className={`footer footer__main ${className || ''}`}>
        <div className='container-fluid'>
          <div className='footer__content d-flex align-items-center justify-content-between'>
            <p className='footer__copyright text-muted mb-0'>
              2020 – Steenify. All rights reserved.
            </p>
            <div className='footer__links listlinks'>
              <Link title='Privacy Policy' to={WEB_ROUTES.POLICY.path}>
                Privacy Policy
              </Link>
              <Link title='Privacy Policy' to={WEB_ROUTES.TERMS.path}>
                Terms &amp; Conditions
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </Fragment>
  );
};

export default Footer;
