var TempStore = GIBE.collections.TempStore;
var storage = GIBE.helpers.storage;

Template.history.helpers({
  history: function () {
    return storage.get();
  },
  image: function () {
    return TempStore.findOne(this.imageId);
  }
});
