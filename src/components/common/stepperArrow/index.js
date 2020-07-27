import React from 'react';

import { Button, ButtonGroup } from 'reactstrap';

import { ReactComponent as ArrowRightIcon } from 'assets/img/arrow-right.svg';
import { ReactComponent as ArrowLeftIcon } from 'assets/img/arrow-left.svg';

import './styles.scss';

const StepperArrow = (props) => {
  const { current, total, onChange } = props;
  const isPrevDisabled = current === 0;
  const isNextDisabled = current === total - 1;
  return (
    <>
      <ButtonGroup className='stepper_arrow'>
        <Button className={`button ${isPrevDisabled ? 'disabled' : 'active'}`} onClick={() => onChange(current - 1)} disabled={isPrevDisabled}>
          <ArrowLeftIcon />
        </Button>
        <Button className={`button ${isNextDisabled ? 'disabled' : 'active'}`} onClick={() => onChange(current + 1)} disabled={isNextDisabled}>
          <ArrowRightIcon />
        </Button>
      </ButtonGroup>
    </>
  );
};

export default StepperArrow;
