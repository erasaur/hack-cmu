var TempStore = GIBE.collections.TempStore;
Template.history.helpers({
  images: function () {
    return TempStore.find().fetch();
  }
 });