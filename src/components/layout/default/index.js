import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Footer from 'components/layout/footer';
import Header from 'components/layout/header';
import SideBar from 'components/layout/sidebar';

import SentryErrorBoundary from 'components/SentryErrorBoundary';

import './style.scss';

const DefaultLayout = (props) => {
  const { children, isMenuOpen, className } = props;
  return (
    <div className={className}>
      <SentryErrorBoundary>
        <SideBar />
      </SentryErrorBoundary>
      <div className={`app-body ${isMenuOpen ? 'open' : ''}`}>
        <SentryErrorBoundary>
          <Header />
        </SentryErrorBoundary>
        <div className='app-main py-5'>
          <SentryErrorBoundary>{children}</SentryErrorBoundary>
        </div>
        <SentryErrorBoundary>
          <Footer />
        </SentryErrorBoundary>
      </div>
    </div>
  );
};

const mapStateToProps = ({ global }) => {
  return {
    isMenuOpen: global.ui.isMenuOpen,
  };
};

export default connect(mapStateToProps, {})(DefaultLayout);

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
