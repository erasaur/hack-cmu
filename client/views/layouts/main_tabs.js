var helpers = GIBE.helpers;

Template.main_tabs.events({
  'click .js-capture': function (event, template) {
    MeteorCamera.getPicture({}, function (error, data) {
      if (error) {
        console.log('unable to get picture');
        return;
      }

      // var data = data.replace('data:image/jpeg;base64,', '');
      var data = helpers.base64ToBinary(data);

      Meteor.call('searchForImage', data, function (error, result) {
        if (error) {
          console.log('error searching for image');
        }
        console.log(result);

        Meteor.call('searchOnEbay', result, function (error, result) {
          console.log(result);
        });
      });

    });
  }
});
