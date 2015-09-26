var helpers = GIBE.helpers;

helpers.get = function (obj, key) {
  return _.get(obj, key);
};

helpers.getSetting = function (setting) {
  return helpers.get(Meteor, 'settings.' + setting);
};

helpers.base64ToBinary = function (dataURI) {
  var BASE64_MARKER = ';base64,';
  var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
  var base64 = dataURI.substring(base64Index);
  var raw = window.atob(base64);
  var rawLength = raw.length;
  var array = new Uint8Array(new ArrayBuffer(rawLength));

  for (var i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i);
  }

  return array;
};

helpers.uint8ToBuffer = function (arrayBuffer) {
  var buffer = new Buffer(arrayBuffer.length);
  for (var i = 0; i < buffer.length; i++) {
    buffer[i] = arrayBuffer[i];
  }
  return buffer;
};

// // http://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
// helpers.base64ToBuffer = function (b64Data, contentType, sliceSize) {
//   var contentType = contentType || 'image/jpg';
//   var sliceSize = sliceSize || 512;

//   var byteCharacters = atob(b64Data);
//   var byteArrays = [];

//   for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
//     var slice = byteCharacters.slice(offset, offset + sliceSize);

//     var byteNumbers = new Array(slice.length);
//     for (var i = 0; i < slice.length; i++) {
//       byteNumbers[i] = slice.charCodeAt(i);
//     }

//     var byteArray = new Uint8Array(byteNumbers);

//     byteArrays.push(byteArray);
//   }

//   var blob = new Blob(byteArrays, { type: contentType });
//   return blob;
// };
