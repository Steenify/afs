import React from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import './style.scss';

const GoogleMap = ({ children, ...props }) => (
  <div className='google-map'>
    <GoogleMapReact {...props}>{children}</GoogleMapReact>
  </div>
);

export default GoogleMap;

GoogleMap.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

GoogleMap.defaultProps = {
  children: null,
};
