Template.results.helpers({
  results: function () {
    var results = Session.get('ebayResults') || [];

    if (_.isString(results)) {
      results = JSON.parse(results);
    }

    return results !== -1 && results;
  }
});
