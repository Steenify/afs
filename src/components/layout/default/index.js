import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { filter } from 'lodash';

import Footer from 'components/layout/footer';
import Header from 'components/layout/header';
import SideBar from 'components/layout/sidebar';
import Announcement from 'components/layout/announcement';

import SentryErrorBoundary from 'components/SentryErrorBoundary';

import './style.scss';

const DefaultLayout = (props) => {
  const { children, isMenuOpen, className, systemProperties, showAnnouncement } = props;
  const list_announcement = filter(systemProperties, (prob) => prob.name === 'admin_announcement');
  const has_announcement = list_announcement.length;
  return (
    <div className={`${className} ${showAnnouncement && 'has__annoucement'}`}>
      {has_announcement && <Announcement data={list_announcement} />}
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

const mapStateToProps = ({ global, systemProperty }) => {
  return {
    isMenuOpen: global.ui.isMenuOpen,
    systemProperties: systemProperty.data.systemProperties || [],
    showAnnouncement: global.ui.showAnnouncement,
  };
};

export default connect(mapStateToProps, {})(DefaultLayout);

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
