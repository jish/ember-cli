'use strict';

var path    = require('path');
var Command = require('../models/command');

module.exports = Command.extend({
  availableOptions: [
    { name: 'environment', type: String, default: 'development' },
    { name: 'output-path', type: path, default: 'dist/' }
  ],
  name: 'build',

  run: function(commandOptions) {
    this.tasks.build.ui   = this.ui;
    this.tasks.build.analytics = this.analytics;

    return this.tasks.build.run(commandOptions);
  }
});
