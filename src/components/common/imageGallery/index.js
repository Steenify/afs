import React, { PureComponent } from 'react';
import Carousel, { Modal, ModalGateway } from 'react-images';
import { isObject } from 'lodash';
import { saveAs } from 'file-saver';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faSearchMinus, faSearchPlus } from '@fortawesome/free-solid-svg-icons';

import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

import ImageLoadAble from '../imageLoadAble';

import { ReactComponent as CloseIcon } from 'assets/img/close.svg';

import './style.scss';

const ClickableImageView = React.memo((props) => {
  const {
    currentView: { source, alt, caption },
  } = props;

  return (
    <div className='react-images__view react-images__view--isModal' style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
      <TransformWrapper wheel={{ step: 70 }} options={{ maxScale: 2.5 }}>
        {({ zoomIn, zoomOut }) => (
          <>
            <TransformComponent>
              <img
                className='react-images__view-image--isModal'
                src={source.regular || source}
                alt={alt}
                style={{ width: '100vw', height: 'calc(100vh - 50px)', objectFit: 'contain', pointerEvents: 'auto' }}
              />
            </TransformComponent>
            <div>
              <FontAwesomeIcon
                icon={faSearchPlus}
                size='2x'
                color='grey'
                className='cursor-pointer m-3'
                onClick={(e) => {
                  zoomIn(e);
                  e.stopPropagation();
                }}
              />
              <FontAwesomeIcon
                icon={faSearchMinus}
                size='2x'
                color='grey'
                className='cursor-pointer m-3'
                onClick={(e) => {
                  zoomOut(e);
                  e.stopPropagation();
                }}
              />
              <FontAwesomeIcon
                icon={faDownload}
                size='2x'
                color='grey'
                className='cursor-pointer m-3'
                onClick={(e) => {
                  saveAs(source.download, caption);
                  e.stopPropagation();
                }}
              />
            </div>
          </>
        )}
      </TransformWrapper>
    </div>
  );
});

class ImageGallery extends PureComponent {
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
    const { images, alt, title, canDelete, onDelete, renderItem } = this.props;
    const list = images.map((source) => ({
      caption: source?.fileName || title,
      alt: alt,
      source,
    }));

    return (
      <>
        {list &&
          list.map((img, index) => {
            if (renderItem) {
              return renderItem({
                key: `images_gallerry__item__${index.toString()}`,
                item: img,
                onClick: () => this.toggleModal(index),
              });
            }

            return (
              <div className='images_gallerry__item d-inline-block' key={`images_gallerry__item__${index.toString()}`}>
                {canDelete && (
                  <button onClick={() => onDelete(img, index)} className='images_gallerry__delete' type='button'>
                    <span className='icon'>
                      <CloseIcon />
                    </span>
                  </button>
                )}

                <div className='images_gallerry__img' onClick={() => this.toggleModal(index)}>
                  {isObject(img.source) ? (
                    <ImageLoadAble type={img.source.type} url={img.source.thumbnail || img.source.thumbnailLink} fileName={img.source.fileName} />
                  ) : (
                    <ImageLoadAble url={img.source} />
                  )}
                </div>
              </div>
            );
          })}

        <ModalGateway>
          {modalIsOpen ? (
            <Modal onClose={() => this.toggleModal(0)} allowFullscreen={false}>
              <Carousel
                views={list}
                currentIndex={currentIndex}
                trackProps={{
                  onViewChange: (view) => console.log(view),
                }}
                components={{ View: ClickableImageView }}
                styles={{
                  container: (base) => ({
                    ...base,
                    height: '100vh',
                  }),
                  header: (base) => ({ ...base, zIndex: 3 }),
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
  canDelete: false,
  onDelete: () => {},
  renderItem: null,
};

export default ImageGallery;
