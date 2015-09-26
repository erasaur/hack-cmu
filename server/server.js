var TempStore = GIBE.collections.TempStore;
var helpers = GIBE.helpers;
var Future = Meteor.npmRequire('fibers/future');
var request = Meteor.npmRequire('request');

var api = "Sw5lTjNOWlw_BGPy1u7Vog";

// var FormData = Meteor.npmRequire('form-data');

Meteor.methods({
  'searchForImage': function (base64) {
    // check(uint8Array, Uint8Array);

    var buffer = new Buffer(base64, 'base64');
    // var buffer = helpers.uint8ToBuffer(uint8Array);
    var cloudSightKey = helpers.getSetting('cloudSightKey');

    console.log(cloudSightKey);

    var future = new Future();
    var fsFile = new FS.File();

    fsFile.attachData(buffer, { type: 'image/jpeg' }, function (error) {
      if (error) {
        console.log(error);
        return;
      }

      TempStore.insert(fsFile, function (error, fileObj) {
        var image = new FS.File(fileObj);
        var url = Meteor.absoluteUrl() + image.url({ brokenIsFine: true }).substring(1);

        var postOptions = {
          url: 'https://api.cloudsightapi.com/image_requests',
          headers: {
            'Authorization': 'CloudSight ' + api,
            // 'Content-Type': 'multipart/form-data'
          },
          formData: {
            // 'image_request[image]': buffer,
            'image_request[remote_image_url]': url,
            // 'image_request[remote_image_url]': 'http://www.gearone.com/media/product-images/808fd49e51e8ed4a82d9430cedc707f0.jpg',
            'image_request[locale]': 'en-US'
          }
        };

        request.post(postOptions, function (error, response, body) {
          if (error) {
            throw error;
          }

          body = JSON.parse(body);

          var getOptions = {
            url: 'https://api.cloudsightapi.com/image_responses/' + body.token,
            headers: {
              'Authorization': 'CloudSight ' + api
            }
          };

          var getImage = function () {
            request.get(getOptions, function (error, response, body) {
              if (error) {
                throw error;
              }
              body = JSON.parse(body);
              // console.log(response, body);
              if (body.status === 'not completed') {
                setTimeout(getImage, 500);
              } else {
                future.return(body);
              }
            });
          };
          getImage();
        });
      });
    });

    return future.wait();
  }
});
