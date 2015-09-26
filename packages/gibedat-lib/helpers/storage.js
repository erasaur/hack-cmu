var helpers = GIBE.helpers;
var storage = helpers.storage;

var STORAGE_NAME = 'gibe-storage';

storage.get = function (key) {
  var store = localStorage.getItem(STORAGE_NAME);
  try {
    store = JSON.parse(store);
  } catch (error) {
    log('malformed localStorage...? failed json parse in get');
    store = {};
  }

  return key ? helpers.get(store, key) : store;
};

storage.add = function (item) {
  var store = storage.get();
  store = store || [];
  store.push(item);
  localStorage.setItem(STORAGE_NAME, JSON.stringify(store));
  return store;
};
