import React, { forwardRef } from 'react';
import { Button } from 'reactstrap';
import './style.scss';

export default forwardRef((props, ref) => {
  const { onClick, className, children, color, style } = props;
  return (
    <div
      ref={ref}
      className={`steenify-btn steenify-btn--${color || 'secondary'}`}>
      <Button
        className={className}
        {...props}
        onClick={onClick}
        cssModule={style || null}>
        {children}
      </Button>
    </div>
  );
});
