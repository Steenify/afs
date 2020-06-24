importScripts('https://www.gstatic.com/firebasejs/7.15.0/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/7.15.0/firebase-messaging.js',
);

var firebaseConfig = {
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

var messaging = firebase.messaging();

var isSupportedMessage = firebase.messaging.isSupported();

if (isSupportedMessage) {
  messaging.setBackgroundMessageHandler(function (payload) {
    console.log(
      '[firebase-messaging-sw.js] Received background message ',
      payload,
    );
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
      body: 'Background Message body.',
      icon: '/favicon-32x32.png',
    };

    return self.registration.showNotification(
      notificationTitle,
      notificationOptions,
    );
  });
}
