'use strict';

var path          = require('path');
var camelize      = require('../utilities/string').camelize;
var getCallerFile = require('../utilities/get-caller-file');

function Task() {
  // Name and key
  this.name = this.name || path.basename(getCallerFile(), '.js');
  this.key  = this.key || camelize(this.name);

  // run() method
  // if (!options.run) {
  //   throw new Error('Task ' + this.name + ' has no run() defined.');
  // }
  // this._run = options.run;
}

module.exports = Task;

Task.__proto__ = require('./core-object');

// Task.prototype.run = function(env, options) {
//   if (!env) {
//     throw new Error('Environment parameter missing.');
//   }
//   return this._run(env, options || {});
// };
