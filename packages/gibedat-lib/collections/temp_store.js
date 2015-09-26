var collections = GIBE.collections;

var imageStore = new FS.Store.FileSystem("images", {
  // path: "~/app-files/images", //optional, default is "/cfs/files" path within app container
  // transformWrite: myTransformWriteFunction, //optional
  // transformRead: myTransformReadFunction, //optional
  // maxTries: 1 //optional, default 5
});

var TempStore = collections.TempStore = new FS.Collection("images", {
  stores: [imageStore]
});

TempStore.allow({
  insert: function () {
    return true;
  },
  download: function (userId, fileObj) {
    return true;
  }
});
