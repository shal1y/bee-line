/**

 file-name       : index.js
 project-name    : bee-line

 Created by SS Virk on 30 Sep, 2015.
 */

var _helper     = require('./extra/helper');
var _state      = require('./extra/state');
var _qParser    = require('query-string');

var router  = {

	state: _state,
	helper: _helper,

	start: function() {
		window.addEventListener('hashchange', handleHashChange, false);
		this.state.running   = true;

		//  initialize...
		handleHashChange();
	},


	stop: function() {
		window.removeEventListener('hashchange', handleHashChange, false);
		this.state.running   = false;
	},


	reset: function() {
		this.state.matches       = [];
		this.state.subscribers   = [];
	},


	getHash: function() {
		return window.location.hash.slice(1);
	},


	redispatch: function() {
		handleHashChange();
	},



	addRoutes: function(routes) {
		if (!routes || routes.length < 1)
			return;

		var self    = this;

		routes.forEach(function(route) {
			for (var key in route) {
				self.state.matches.push({match:key, arg:route[key]});
			}
		})
	},


	register: function(fn) {
		if (this.state.subscribers.indexOf(fn) == -1)
			this.state.subscribers.push(fn);
	},


	emit: function() {
		var args    = arguments;
		this.state.subscribers.forEach(function(fn) {
			fn.apply(null, args);
		});
	}

}


var handleHashChange    = function() {

	var _hash   = router.getHash();
	var hash    = _hash;
	var query   = null;

	if (_hash.indexOf('?') != -1) {
		query   = _hash.slice(hash.indexOf('?'));
		hash    = _hash.replace(query, '');
	}

	var tuple   = router.helper.getArgsAndParams(hash, router.state.matches);

	if (tuple.arg === undefined)
		router.emit('not-found', _hash);
	else
		router.emit(tuple.arg, tuple.params, _qParser.parse(query));

}


module.exports  = router;
