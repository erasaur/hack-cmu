Package.describe({
  name: 'gibedat-lib',
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

  api.use('gibedat-deps');

  api.addFiles([
    'lib.js',
    'helpers/helpers.js',
    'helpers/storage.js',
    'routes/capture.js',
    'routes/history.js',
    'routes/results.js',
    'collections/temp_store.js',
  ]);

  api.export('GIBE');
});
