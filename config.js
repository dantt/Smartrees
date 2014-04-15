// Configuration file. So kewl


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
/** Costruttore di Config (LOL)  */
/**********************************/
/**********************************/

function Config(){
}




/*********************************/
/*********************************/
/***** Campi dati di Config *******/
/*********************************/
/*********************************/

Config.prototype._defaultOptions = {
	nodeSelectedFillColor: '#FFFCB0',
	simulationSpeed: 2000,
	defaultStrategy: 'Dfs',
};




/*********************************/
/*********************************/
/*** Getter & Setter di Settings ***/
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





/**********************************/
/**********************************/
/********* Debug Area :( **********/
/**********************************/
/**********************************/

_projectDebug = 1;

function debug(msg) {
	if (_projectDebug == 1) {
		console.log(msg);
	}
}
