import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Spinner } from 'reactstrap';
import * as Sentry from '@sentry/react';

// import { buildType } from './config';

// third partys
import './vendor';

// Styles
import './styles/index.scss';

import * as serviceWorker from './vendor/serviceWorker';

import Store from './store';
import App from './App';

Sentry.init({
  dsn:
    'https://597f3416b2734db5b3963e3a99dad0c9@o414568.ingest.sentry.io/5304252',
});

ReactDOM.render(
  <Provider store={Store}>
    <Suspense
      fallback={
        <div className='d-flex align-items-center justify-content-center vh-100 vw-100'>
          <Spinner />
        </div>
      }>
      <App />
    </Suspense>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

// console.log("buildType === 'PROD'", buildType === 'PROD');
// if (buildType === 'PROD') {
//   serviceWorker.register();
// } else {
serviceWorker.unregister();
// }
