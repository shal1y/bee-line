/**

 file-name       : helper.js
 project-name    : bee-line

 Created by SS Virk on 30 Sep, 2015.
 */


var helper  = {

	pathToArray: null,
	hasMatch: false,
	isParam: false,


	getArgsAndParams: function(hash, matches) {
		var i = -1, item, params;

		while (++i < matches.length) {
			item    = matches[i];
			params  = hasMatch(item.match, hash);

			if (params) {
				return {
					arg: item.arg,
					params:params
				}
			}
		}

		return false;
	}

}


var hasMatch    = function(match, hash) {
	var matchArray  = pathToArray(match);
	var hashArray   = pathToArray(hash);
	var params      = {};

	var found = true, i = -1, h, m;

	if (matchArray.length !== hashArray.length) {
		return false;
	}

	while (++i < matchArray.length) {
		h   = hashArray[i];
		m   = matchArray[i];

		if (isParam(m))
			params[m.slice(1)]  = h;
		else if (m !== h)
		{
			found   = false;
			break;
		}
	}


	return found ? params : false;
}


var pathToArray = function(path) {
	return path.split('/').filter(function(item){
		return !!item;
	})
}


var isParam = function(str) {
	return str.charAt(0) === ':';
}


module.exports  = helper;
