Package.describe({
  name: 'gibedat-deps',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.0.1');

  api.imply([
    'ecmascript',
    'check',
    'ejson',
    'base64',
    'localstorage',
    // 'froatsnook:request@2.58.0',
    'erasaur:meteor-lodash@3.10.1',
    'fourseven:scss@3.2.0',
    'iron:router@1.0.9',
    'mdg:camera',
    'mdg:reload-on-resume',
    'meteoric:ionic@0.1.19',
    'meteoric:ionic-sass@0.3.0',
    'meteoric:ionicons-sass@0.1.7',
    'meteorhacks:npm@1.5.0',
    'cfs:standard-packages@0.5.9',
    'cfs:filesystem@0.1.2',
    'reactive-var'
  ]);
});
