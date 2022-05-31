importScripts('https://www.gstatic.com/firebasejs/8.9.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.9.1/firebase-messaging.js');

//in service woker
self.addEventListener("notificationclick", (event) => {
  event.waitUntil(async function () {
      const allClients = await clients.matchAll({
          includeUncontrolled: true
      });
      let chatClient;
      for (const client of allClients) {
          if (client['url'].indexOf(event.notification.data.FCM_MSG.notification.click_action) >= 0) {
              client.focus();
              chatClient = client;
              break;
          }
      }
      if (!chatClient) {
          chatClient = await clients.openWindow(event.notification.data.FCM_MSG.notification.click_action);
      }
  }());
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../firebase-messaging-sw.js')
    .then(function(registration) {
    console.log('Registration successful, scope is:', registration.scope);
    }).catch(function(err) {
    console.log('Service worker registration failed, error:', err);
    });
}
