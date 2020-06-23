import * as firebase from 'firebase/app';
import 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyAZC5APOtyBuivhwOtWMFGet2CmT74dwE4',
  authDomain: 'turnedninja.firebaseapp.com',
  databaseURL: 'https://turnedninja.firebaseio.com',
  projectId: 'turnedninja',
  storageBucket: 'turnedninja.appspot.com',
  messagingSenderId: '88204029628',
  appId: '1:88204029628:web:f2874d3129e5eb992c6ab9',
  measurementId: 'G-HNQBG5X0K9',
};
// Initialize Firebase

firebase.initializeApp(firebaseConfig);

export const Messaging = firebase.messaging();

Messaging.requestPermission()
  .then(() => {
    return Messaging.getToken();
  })
  .then((token) => {
    console.log('token', token);
  })
  .catch((err) => {
    console.log('requestPermission fail', JSON.stringify(err));
  });
export const MyFirebase = firebase;
