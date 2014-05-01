'use strict';

var path            = require('path');
var assert          = require('../../helpers/assert');
var MockUI          = require('../../helpers/mock-ui');
var MockAnalytics   = require('../../helpers/mock-analytics');
var rewire          = require('rewire');
var stubPath        = require('../../helpers/stub').stubPath;
var Promise  = require('../../../lib/ext/promise');
var Task  = require('../../../lib/models/task');
var InitCommand;

describe('init command', function() {
  var ui;
  var analytics;
  var project;
  beforeEach(function() {
    ui = new MockUI();
    analytics = new MockAnalytics();
    project = {pkg: { name: 'some-random-name'}};
    InitCommand = rewire('../../../lib/commands/init');
    InitCommand.__set__('path', stubPath('test'));
  });

  it('doesn\'t allow to create an application named `test`', function() {
    assert.throw(function() {
      new InitCommand({
        ui: ui,
        analytics: analytics,
        project: project,
        tasks: {}
      }).validateAndRun([]);
    }, undefined);
  });

  it('Uses the name of the closest project to when calling installBlueprint', function() {
    var command = new InitCommand({
      ui: ui,
      analytics: analytics,
      project: project,
      tasks: {
        installBlueprint: Task.extend({
          run: function(ui, blueprintOpts) {
            assert.equal(blueprintOpts.rawName, 'some-random-name');
            return Promise.reject('Called run');
          }
        })
      }
    });

    return command.validateAndRun([])
      .catch(function(reason) {
        assert.equal(reason, 'Called run');
      });
  });

  it('Uses process.cwd if no package is found when calling installBlueprint', function() {
    var command = new InitCommand({
      ui: ui,
      analytics: analytics,
      project: project,
      tasks: {
        installBlueprint: Task.extend({
          run: function(ui, blueprintOpts) {
            assert.equal(blueprintOpts.rawName, path.basename(process.cwd()));
            return Promise.reject('Called run');
          }
        })
      }
    });

    return command.validateAndRun([])
      .catch(function(reason) {
        assert.equal(reason, 'Called run');
      });
  });
});
