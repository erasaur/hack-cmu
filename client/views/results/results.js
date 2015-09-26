Template.results.helpers({
  images: function () {
    var results = Session.get('ebayResults');

    if (_.isString(results)) {
      results = JSON.parse(results);
    }

    console.log(Session.get('ebayResults')[0]);

    return Session.get('ebayResults');
  }
});
