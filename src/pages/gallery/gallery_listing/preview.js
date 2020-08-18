import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import useHover from 'components/common/hooks/useHover';

const ActionableImage = ({ children, ...props }) => {
  const [hoverRef, isHovered] = useHover();

  return (
    <div ref={hoverRef}>
      <LazyLoadImage {...props}></LazyLoadImage>
      <div style={{ display: isHovered ? 'block' : 'none', position: 'absolute', top: '0', bottom: '0', left: '0', right: '0', zIndex: '100' }}>{children}</div>
    </div>
  );
};

export default ActionableImage;
