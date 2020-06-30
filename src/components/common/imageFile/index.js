import React, { Component } from 'react';

import General from 'assets/img/general__image.jpg';

import PSDFile from 'assets/img/psd__icon.jpg';

// const PSDFileType = 'image/vnd.adobe.photoshop';

class ImageFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urlBase64: '',
      isImage: true,
      isPSD: false,
    };
  }

  componentDidMount() {
    const { file } = this.props;
    if (!file) {
      return;
    }
    const isPSD = (file?.name || '').indexOf('.psd') !== -1;
    const isImage = file?.type.indexOf('image/') !== -1;

    if (!isPSD && isImage) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.setState({
          urlBase64: e.target.result,
        });
      };
      reader.readAsDataURL(file);
    } else {
      this.setState({
        isImage: false,
        isPSD,
      });
    }
  }

  render() {
    const { className } = this.props;
    const { urlBase64, isImage, isPSD } = this.state;
    return (
      <div className={`image__file ${className}`}>
        {!isImage && !isPSD && <img src={General} alt={className} />}
        {!isImage && isPSD && <img src={PSDFile} alt={className} />}
        {urlBase64 && isImage && <img src={urlBase64} alt={className} />}
      </div>
    );
  }
}

ImageFile.defaultProps = {
  file: null,
  className: '',
};

export default ImageFile;
