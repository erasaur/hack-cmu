var helpers = GIBE.helpers;
var storage = helpers.storage;
var TempStore = GIBE.collections.TempStore;

Template.main_tabs.events({
  'click .js-camera': function () {
    console.log('created');
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

        if (!_.isString(caption)) {
          Session.set('ebayResults', []);
          Router.go('results');
        } else {
          Meteor.call('searchOnEbay', caption, function (error, result) {
            var processResult = function () {
              if (!result) {
                setTimeout(processResult, 100);
              } else {
                if (result !== -1) {
                  storage.add({
                    'caption': caption,
                    'imageId': TempStore.findOne({}, { sort: { '_id': -1 } })._id,
                    'results': result
                  });
                }

                console.log(result);

                Session.set('ebayResults', result === -1 ? [] : result);
                Router.go('results');
              }
            };
            processResult();
          });
        }

      });
    });
  }
});
