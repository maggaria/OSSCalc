/* eslint-env node */
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
  });

  app.import('bower_components/bootstrap/dist/css/bootstrap.min.css');
  app.import('bower_components/bootstrap/dist/js/bootstrap.min.js');
  app.import('bower_components/bootstrap/fonts/glyphicons-halflings-regular.woff', {
  destDir: 'fonts'
});

  app.import('bower_components/jquery/dist/jquery.min.js'); 

  return app.toTree();
};
