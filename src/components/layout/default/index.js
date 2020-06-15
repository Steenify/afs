import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Footer from 'components/layout/footer';
import Header from 'components/layout/header';
import SideBar from 'components/layout/sidebar';
import './style.scss';

const DefaultLayout = ({ children, isMenuOpen }) => (
  <React.Fragment>
    <SideBar />
    <div className={`app-body ${isMenuOpen ? 'open' : ''}`}>
      <Header />
      <div className='app-main py-5'>{children}</div>
      <Footer />
    </div>
  </React.Fragment>
);

const mapStateToProps = ({ global }) => {
  return {
    isMenuOpen: global.ui.isMenuOpen,
  };
};

export default connect(mapStateToProps, {})(DefaultLayout);

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
