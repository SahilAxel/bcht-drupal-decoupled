/**
 * @file
 * Lytics behaviour.
 *
 */
(function (Drupal, $) {
  Drupal.behaviors.lytics = {
    attach: function (context, settings) {
      function sendDataToAnalytics(data) {
        return new Promise((resolve, reject) => {
          try {
            if (typeof data !== 'undefined' && data) {
              jstag.send('default', JSON.parse(data));
              resolve(true);
            } else {
              reject('Analytics service is not available');
            }
          } catch (error) {
            reject(error.message);
          }
        });
      }

      if (!context.onceFlag) {
        context.onceFlag = true;
        const stream_data = settings.lytics_stream_data.stream_data;

        sendDataToAnalytics(stream_data)
          .then((message) => {
            console.log('Data sent successfully'); // This runs if the promise is resolved
          })
          .catch((error) => {
            console.error('Failed to send data:', error); // This runs if the promise is rejected
          });
      }
    },
  };
})(Drupal, jQuery);
