import React, { Component } from 'react';
import { ReactComponent as FileIcon } from 'assets/img/file_Icon.svg';

class ImageFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urlBase64: '',
      isImage: true,
    };
  }

  componentDidMount() {
    const { file } = this.props;
    if (!file) {
      return;
    }
    const isPSD = file?.name.indexOf('.psd') !== -1;

    if (!isPSD) {
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
      });
    }
  }

  render() {
    const { className } = this.props;
    const { urlBase64, isImage } = this.state;
    return (
      <div className={`image__file ${className}`}>
        {!isImage && <FileIcon width='100px' height='100px' />}

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
