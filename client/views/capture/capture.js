var helpers = GIBE.helpers;
var storage = helpers.storage;
var TempStore = GIBE.collections.TempStore;

Template.capture.onCreated(function () {
  MeteorCamera.getPicture({}, function (error, data) {
    if (error) {
      console.log('unable to get picture');
      return;
    }

    // var data = data.replace('data:image/jpeg;base64,', '');
    var data = helpers.base64ToBinary(data);

    Meteor.call('searchForImage', data, function (error, caption) {
      if (error) {
        console.log('error searching for image');
      }
      console.log(caption);

      Meteor.call('searchOnEbay', caption, function (error, result) {
        storage.add({
          'caption': caption,
          'imageId': TempStore.findOne({ '_id': -1 }),
          'results': result
        });

        Session.set('ebayResults', result);
        Router.go('results');
      });
    });
  });
});
