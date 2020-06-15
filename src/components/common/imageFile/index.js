import React, { Component } from 'react';

class ImageFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urlBase64: '',
    };
  }

  componentDidMount() {
    const { file } = this.props;
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      this.setState({
        urlBase64: e.target.result,
      });
    };
    reader.readAsDataURL(file);
  }

  render() {
    const { className } = this.props;
    const { urlBase64 } = this.state;
    return (
      <div className={`image__file ${className}`}>
        {urlBase64 && <img src={urlBase64} alt={className} />}
      </div>
    );
  }
}

ImageFile.defaultProps = {
  file: null,
  className: '',
};

export default ImageFile;
