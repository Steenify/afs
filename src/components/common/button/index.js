import React, { forwardRef } from 'react';
import { Button } from 'reactstrap';
import './style.scss';

export default forwardRef((props, ref) => {
  const { containerClassName, ...childProps } = props;
  const { onClick, className, children, color, style } = childProps;
  return (
    <div ref={ref} className={`steenify-btn steenify-btn--${color || 'secondary'} ${containerClassName || ''}`}>
      <Button className={className} {...childProps} onClick={onClick} cssModule={style || null}>
        {children}
      </Button>
    </div>
  );
});
