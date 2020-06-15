import React, { Component } from 'react';
import Carousel, { Modal, ModalGateway } from 'react-images';
import { isObject } from 'lodash';

import './style.scss';

class ImageGallery extends Component {
  constructor() {
    super();
    this.state = { modalIsOpen: false, currentIndex: 0 };
  }

  toggleModal = (index) => {
    this.setState((state) => ({
      modalIsOpen: !state.modalIsOpen,
      currentIndex: index,
    }));
  };

  render() {
    const { modalIsOpen, currentIndex } = this.state;
    const { images, alt, title } = this.props;

    const list = images.map((source) => ({
      caption: title,
      alt: alt,
      source,
    }));

    return (
      <>
        {list &&
          list.map((img, index) => (
            <button
              className='images_gallerry__item'
              key={`images_gallerry__item__${index.toString()}`}
              type='button'
              data={index}
              onClick={() => this.toggleModal(index)}>
              {isObject(img.source) ? (
                <img src={img.source.thumbnail} alt={img.alt} />
              ) : (
                <img src={img.source} alt={img.alt} />
              )}
            </button>
          ))}
        <ModalGateway>
          {modalIsOpen ? (
            <Modal onClose={() => this.toggleModal(0)}>
              <Carousel
                views={list}
                currentIndex={currentIndex}
                styles={{
                  container: (base) => ({
                    ...base,
                    height: '100vh',
                  }),
                  view: (base) => ({
                    ...base,
                    alignItems: 'center',
                    display: 'flex ',
                    height: '100vh',
                    justifyContent: 'center',
                    '& > img': {
                      maxHeight: 'calc(100vh - 30px)',
                    },
                  }),
                }}
              />
            </Modal>
          ) : null}
        </ModalGateway>
      </>
    );
  }
}

ImageGallery.defaultProps = {
  images: [],
  className: '',
  alt: '',
  caption: '',
};

export default ImageGallery;
