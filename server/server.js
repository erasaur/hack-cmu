var TempStore = GIBE.collections.TempStore;
var helpers = GIBE.helpers;
var Future = Meteor.npmRequire('fibers/future');
var request = Meteor.npmRequire('request');
var xml2js = Meteor.npmRequire('xml2js');
var http = Meteor.npmRequire('http');

var api = "Sw5lTjNOWlw_BGPy1u7Vog";

Meteor.methods({
  'searchForImage': function (base64) {
    // check(uint8Array, Uint8Array);

    var buffer = new Buffer(base64, 'base64');
    // var buffer = helpers.uint8ToBuffer(uint8Array);
    var cloudSightKey = helpers.getSetting('cloudSightKey');

    var future = new Future();
    var fsFile = new FS.File();

    // var req = request.post('https://api.cloudsightapi.com/image_requests', function (err, resp, body) {
    //   if (err) {
    //     console.log('Error!');
    //   } else {
    //     console.log('URL: ' + body);
    //   }
    // });
    // var form = req.form();
    // form.append('file', buffer);

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

              if (body.status === 'not completed') {
                setTimeout(getImage, 500);
              } else {
                future.return(body.name);
              }
            });
          };
          getImage();
        });
      });
    });

    return future.wait();
  },
  'searchOnEbay': function (image) {
    check(image, String);
    image = encodeURIComponent(image);

    console.log(image);

    var future = new Future();
    var options = {
      host: 'svcs.ebay.com',
      path: '/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&SERVICE-NAME=FindingService&SECURITY-APPNAME=SelinaBi-bdf9-45a7-b3fd-9a073f43827e&RESPONSE-DATA-FORMAT=XML&keywords=' + image
    };

    var callback = function (response) {
      var str = '';
      response.on('data', function (chunk) {
        str += chunk;
      });
      response.on('end', function () {
        var parser = new xml2js.Parser();
        parser.parseString(str, function (err, result) {

          console.log(result)

          future.return(result.findItemsByKeywordsResponse.searchResult[0].item || -1);
        });
      });
    };

    http.request(options, callback).end();
    return future.wait();
  }
});
