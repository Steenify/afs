import React, { Component } from 'react';
import { toast } from 'react-toastify';

import { Messaging } from 'vendor/firebase';

class FirerBaseApp extends Component {
  componentDidMount() {
    Messaging.onMessage((payload) => {
      console.log('Message received. ', payload);
      toast.info('got message from FCM, check console log');
    });
  }

  render() {
    return <></>;
  }
}

export default FirerBaseApp;
