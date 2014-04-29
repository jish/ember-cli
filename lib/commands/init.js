'use strict';

var path      = require('path');
var Command   = require('../models/command');
var Blueprint = require('../blueprint');

module.exports = Command.extend({
  description: 'Creates a new ember-cli project in the current folder.',
  works: 'everywhere',

  availableOptions: [
    { name: 'dry-run', type: Boolean, default: false },
    { name: 'verbose', type: Boolean, default: false },
    { name: 'blueprint', type: path, default: Blueprint.main }
  ],

  aliases: ['i'],

  run: function(commandOptions/*, rawArgs */) {
    var cwd     = process.cwd();
    var ui      = this.ui;

    var installBlueprint = this.tasks.installBlueprint;
    var npmInstall       = this.tasks.npmInstall;
    var bowerInstall     = this.tasks.bowerInstall;
    var packageName      = this.project ? this.project.pkg.name : path.basename(cwd);
    var blueprintOpts    = {
      dryRun: commandOptions.dryRun,
      blueprint: commandOptions.blueprint,
      rawName: packageName
    };

    if (packageName === 'test') {
      ui.write('Due to an issue with `compileES6` an application name of `test` cannot be used.');
      throw undefined;
    }

    return installBlueprint.run(ui, blueprintOpts)
      .then(function() {
        if (!commandOptions.dryRun) {
          return npmInstall.run(ui, { verbose: commandOptions.verbose });
        }
      })
      .then(function() {
        if (!commandOptions.dryRun) {
          return bowerInstall.run(ui, { verbose: commandOptions.verbose });
        }
      });
  },

  usageInstructions: function() {
    return {
      anonymousOptions: '<app-name>'
    };
  }
});
