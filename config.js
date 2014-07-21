/**********************************/
/**********************************/
/********** OBSOLETE ************/
/**********************************/
/**********************************/

treeConfig = {	
	nodeSelectedFillColor: '#FFFCB0',
};
simulationConfig = {
	simulationSpeed: 2000,
	defaultStrategy: 'Dfs',
}





/**********************************/
/**********************************/
/** Config constructor  */
/**********************************/
/**********************************/

function Config(){
}




/*********************************/
/*********************************/
/***** Config fields *******/
/*********************************/
/*********************************/

Config.prototype._defaultOptions = {
	nodeSelectedFillColor: '#FFFCB0',
	simulationSpeed: 2000,
	defaultStrategy: 'Dfs',
};




/*********************************/
/*********************************/
/*** Getter and setter for Settings ***/
/*********************************/
/*********************************/


Config.prototype.getOption = function(optName) {
	var option = localStorage.getItem(optName);
	if (option) {
		return option;
	}
	else {
		localStorage.setItem(optName, this._defaultOptions[optName]);
		return this._defaultOptions[optName];
	}
};


Config.prototype.setOption = function(optName, optValue) {
	localStorage.setItem(optName, optValue);
};


Config.prototype.setOptions = function(serialized) {
	var scope = this;
	$.each(serialized.split('&'), function (index, elem) {
   		var vals = elem.split('=');
   		scope.setOption(vals[0], decodeURIComponent(vals[1]));
	});
};




/******************/
/******************/
/******* Init *******/
/******************/
/******************/

iaSettings = new Config();


/**********************************/
/**********************************/
/********* Debug Area :( **********/
/**********************************/
/**********************************/

_projectDebug = 1;

function debug(msg) {
	if (typeof window !== 'undefined' && _projectDebug == 1) {
		console.log(msg);
	}
}
