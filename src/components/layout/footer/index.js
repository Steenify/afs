import React, { Fragment } from 'react';
import './style.scss';

const Footer = (props) => {
  const { className } = props;
  return (
    <Fragment>
      <footer className={`footer ${className || ''}`}>
        <div className='container-fluid'>
          <div className='d-flex align-items-center justify-content-between'>
            <p className='text-muted mb-0'>
              2020 – Steenify. All rights reserved.
            </p>
            <div className='listlinks'>
              <a title='Privacy Policy' href='#'>
                Privacy Policy
              </a>
              <a title='Privacy Policy' href='#'>
                Terms &amp; Conditions
              </a>
            </div>
          </div>
        </div>
      </footer>
    </Fragment>
  );
};

export default Footer;
