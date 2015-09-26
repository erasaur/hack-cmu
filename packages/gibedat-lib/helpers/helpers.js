var helpers = GIBE.helpers;

helpers.get = function (obj, key) {
  return _.get(obj, key);
};

helpers.getSetting = function (setting) {
  return helpers.get(Meteor, 'settings${setting}');
};

// http://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
helpers.base64ToBuffer = function (b64Data, contentType, sliceSize) {
  var contentType = contentType || 'image/jpg';
  var sliceSize = sliceSize || 512;

  var byteCharacters = atob(b64Data);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);

    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  var blob = new Blob(byteArrays, { type: contentType });
  return blob;
};
