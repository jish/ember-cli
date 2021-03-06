'use strict';

var assign  = require('lodash-node/modern/objects/assign');
var Command = require('../command');

module.exports = new Command({
  aliases: ['server', 's'],

  availableOptions: [
    { name: 'port', type: Number, default: 4200 },
    { name: 'host', type: String, default: '0.0.0.0' },
    { name: 'proxy-port',  type: Number },
    { name: 'proxy-host',  type: String },
    { name: 'live-reload',  type: Boolean, default: true },
    { name: 'environment', type: String, default: 'development' }
  ],

  run: function(environment, options) {
    options = assign({}, options, {
      liveReloadPort: options.port - 4200 + 35729
    });

    environment.tasks.serve.ui   = this.ui;
    environment.tasks.serve.leek = this.leek;

    return environment.tasks.serve.run(options);
  }
});
