import React from 'react';
import * as Sentry from '@sentry/react';

import ErrorPlaceholder from './errorplaceholder';

const SentryErrorBoundary = (props) => {
  const { children } = props;
  return (
    <Sentry.ErrorBoundary fallback={ErrorPlaceholder}>
      {children}
    </Sentry.ErrorBoundary>
  );
};

export default SentryErrorBoundary;
