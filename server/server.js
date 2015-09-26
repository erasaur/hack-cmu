var helpers = GIBE.helpers;
var Future = Meteor.npmRequire('fibers/future');

Meteor.methods({
  'searchForImage': function (data) {
    check(data, String);

    var future = new Future();
    var postOptions = {
      headers: {
        'Authorization': 'CloudSight ' + helpers.getSetting('cloudSightKey')
      },
      params: {
        'image_request[image]': helpers.base64ToBuffer(data),
        'image_request[locale]': 'en-US'
      }
    };

    HTTP.post('https://api.cloudsightapi.com/image_requests', postOptions, function (error, result) {
      if (error) {
        throw error;
      }

      var getOptions = {
        headers: {
          'Authorization': 'CloudSight ' + get.setting('cloudSightKey')
        }
      };

      HTTP.get('https://api.cloudsightapi.com/image_responses/' + result.token, getOptions, function (error, result) {
        if (error) {
          throw error;
        }
        future.return(result);
      });
    });

    return future.wait();
  }
});
