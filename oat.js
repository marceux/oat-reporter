/**
 * Module dependencies.
 */

var color = require( "chalk" ),
	log = require( "gulp-util" ).log;

/**
 * Expose `Oat`.
 */

exports = module.exports = Oat;



/**
 * Initialize a new `Oat` test reporter.
 *
 * @param {Runner} runner
 * @api public
 */

function Oat( runner ) {

  var self = this,
		stats = this.stats,
		indents = 0,
		n = 0;

  runner.on( "start", function(){
		console.log();
  });

  runner.on( "suite", function( suite ){
		if ( suite.tests.length ) {
			log( color.cyan.bold( "testing : " + suite.title + "  [" + suite.tests.length + " tests]" ) );
		}
  });

  runner.on( "suite end", function( suite ){
		console.log();
  });

  runner.on( "pending", function( test ){
    console.log( test.title );
  });

  runner.on( "pass", function( test ){
		console.log( "\t" + color.green.bold( "%s : " ) + "%s", test.state, test.title );
  });

  runner.on( "fail", function( test, error ){
		console.log( "\t" + color.red.bold( "%s : " ) + "%s", test.state, test.title );
		console.log( "\t" + color.red.bold( "  x " ) + " %s", error.message );
  });
}
