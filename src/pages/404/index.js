import React from 'react';
import { ReactComponent as NotFoundIcon } from 'assets/img/404.svg';
import { Link } from 'react-router-dom';
import './style.scss';

const NotFound = () => (
  <div className="app__page notfound__page">
    <main className="notfound__content container-fluid text-center">
      <NotFoundIcon className="notfound__icon" />
    </main>
  </div>
);

export default NotFound;
