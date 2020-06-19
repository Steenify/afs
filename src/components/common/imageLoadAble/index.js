import React, { Component } from 'react';
import ContentLoader from 'react-content-loader';

import { checkImageLoadable } from 'utils';

import General from 'assets/img/general__image.jpg';
import JPGFile from 'assets/img/jpg__icon.jpg';
import PNGFile from 'assets/img/png__icon.jpg';
import PSDFile from 'assets/img/psd__icon.jpg';

import './style.scss';

const PSDFileType = 'image/vnd.adobe.photoshop';
const PNGFileType = 'image/png';
const JPGFileType = 'image/jpeg';

class ImageLoadAble extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadAble: false,
      isLoading: true,
    };
    this.request = null;
  }

  componentDidMount() {
    const { url } = this.props;
    this.request = checkImageLoadable({
      url,
      onError: this.onError,
      onSuccess: this.onSuccess,
    });
  }

  componentWillUnmount() {
    this.request = null;
  }

  onError = () => {
    if (this) {
      this.setState({
        isLoading: false,
      });
    }
  };

  onSuccess = () => {
    if (this) {
      this.setState({
        isLoadAble: true,
        isLoading: false,
      });
    }
  };

  render() {
    const { url, className, type = '' } = this.props;
    const { isLoadAble, isLoading } = this.state;

    const isImage = (type || '').indexOf('image/') !== -1;

    let defaultImage = General;
    if (isImage && type === JPGFileType) {
      defaultImage = JPGFile;
    }
    if (isImage && type === PNGFileType) {
      defaultImage = PNGFile;
    }

    if (isImage && type === PSDFileType) {
      defaultImage = PSDFile;
    }

    return (
      <div className={`image__loadable ${className}`}>
        {isLoading && (
          <ContentLoader viewBox='0 0 500 500' height={80} width={80} speed={1}>
            <rect x='0' y='0' rx='0' ry='0' width='500' height='500' />
          </ContentLoader>
        )}
        {isLoadAble && !isLoading && <img src={url} alt={className} />}
        {!isLoadAble && !isLoading && (
          <img src={defaultImage} alt={className} />
        )}
      </div>
    );
  }
}

ImageLoadAble.defaultProps = {
  file: null,
  className: '',
};

export default ImageLoadAble;
