/**
 * Module dependencies.
 */

var Base = require('mocha/lib/reporters/base');
var inherits = require('mocha/lib/utils').inherits;
var color = Base.color;
var cursor = Base.cursor;

/**
 * Expose `Oats`.
 */

exports = module.exports = Oats;

/**
 * Initialize a new `Oats` test reporter.
 *
 * @api public
 * @param {Runner} runner
 */
function Oats(runner) {
  Base.call(this, runner);

  var self = this;
  var indents = 0;
  var n = 0;

  function indent() {
    return Array(indents).join('  ');
  }

  runner.on('start', function() {
    // clear screen
    process.stdout.write('\u001b[2J');
    // set cursor position
    process.stdout.write('\u001b[1;3H');
    console.log();
  });

  runner.on('suite', function(suite) {
    ++indents;
    console.log(color('suite', '%s%s'), indent(), suite.title);
  });

  runner.on('suite end', function() {
    --indents;
    if (indents === 1) {
      console.log();
    }
  });

  runner.on('pending', function(test) {
    var fmt = indent() + color('pending', '  - %s');
    console.log(fmt, test.title);
  });

  runner.on('pass', function(test) {
    var fmt;
    if (test.speed === 'fast') {
      fmt = indent()
        + color('checkmark', '  ' + Base.symbols.ok)
        + color('pass', ' %s');
      cursor.CR();
      console.log(fmt, test.title);
    } else {
      fmt = indent()
        + color('checkmark', '  ' + Base.symbols.ok)
        + color('pass', ' %s')
        + color(test.speed, ' (%dms)');
      cursor.CR();
      console.log(fmt, test.title, test.duration);
    }
  });

  runner.on('fail', function(test) {
    cursor.CR();
    console.log(indent() + color('fail', '  %d) %s'), ++n, test.title);
  });

  runner.on('end', self.epilogue.bind(self));
}

/**
 * Inherit from `Base.prototype`.
 */
inherits(Oats, Base);
