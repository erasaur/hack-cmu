// var http = require('http');
// var options = {
// host: 'svcs.ebay.com',
// path: '/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&SERVICE-NAME=FindingService&SECURITY-APPNAME=SelinaBi-bdf9-45a7-b3fd-9a073f43827e&RESPONSE-DATA-FORMAT=XML&keywords=nike%20hat'
// };
// var output;
// var callback = function(response) {
//   var str = '';
//   response.on('data', function (chunk) {
//     str += chunk;
//   });
//   response.on('end', function () {
//     var xml2js = require('xml2js');
//     var parser = new xml2js.Parser();
//     parser.parseString(str, function (err, result) {
//         output = result.findItemsByKeywordsResponse.searchResult[0].item;
//         console.log(output);
//     });
//   });
// };
// var output = http.request(options, callback).end();
// //var items = output.findItemsByKeywordsResponse.searchResult[0].item
