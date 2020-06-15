/* @flow */
import * as React from 'react';
import { Helmet } from 'react-helmet';
import Button from 'reactstrap/es/Button';

import { ReactComponent as ArrowLeftIcon } from 'assets/img/arrowleft.svg';

type Props = {
  documentTitle?: string,

  children?: any,

  className?: string,

  container?: boolean,

  fluid?: boolean,

  onGoBack?: () => void,

  bottomView?: React.Node | (() => React.Node),
};

const Layout = (props: Props): React.Node => {
  const {
    documentTitle,
    children,
    className,
    container,
    fluid,
    onGoBack,
    bottomView,
  } = props;

  const classNames = ['app-page', className ? className : ''].join(' ');

  const BottomView = React.useMemo(
    () => (
      <div className='d-flex'>
        {onGoBack && (
          <Button
            style={{
              height: 38,
              display: 'inline-flex',
              alignItems: 'center',
              marginTop: 24,
              minWidth: 86,
              marginRight: 10,
            }}
            onClick={() => onGoBack()}>
            <ArrowLeftIcon />
            &nbsp;
            <span className='d-none d-md-inline'>Back</span>
          </Button>
        )}

        {bottomView &&
          (typeof bottomView === 'function' ? bottomView() : bottomView)}
      </div>
    ),
    [onGoBack, bottomView],
  );

  return (
    <>
      <Helmet title={documentTitle} />
      <div className={classNames}>
        {container && (
          <main className={[fluid ? 'container-fluid' : 'container']}>
            {children}

            {BottomView}
          </main>
        )}
        {!container && (
          <>
            {children}

            {BottomView}
          </>
        )}
      </div>
    </>
  );
};

export default Layout;
