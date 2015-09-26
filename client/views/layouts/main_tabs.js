Template.main_tabs.events({
  'click .js-capture': function (event, template) {
    MeteorCamera.getPicture({}, function (error, data) {
      if (error) {
        console.log('unable to get picture');
        return;
      }

      Meteor.call('searchForImage', data, function (error, result) {
        if (error) {
          console.log('error searching for image');
        }
      });
    });
  }
});
