/**********************************/
/**********************************/
/******* Costruttore di IA  *******/
/**********************************/
/**********************************/

function IA(tree){
  this.problem = new Problem(tree);
  this.problem.strategy = algoMap[iaSettings.getOption('defaultStrategy')];
  this.control = new Controller(this.problem);
  this.treemanager = new TreeManager(this.problem.getTree.bind(this.problem));
  this.settings = iaSettings;
}





/*********************************/
/*********************************/
/******** Campi dati di IA *******/
/*********************************/
/*********************************/

IA.prototype.problem;
IA.prototype.control;
IA.prototype.treemanager;





/*********************************/
/*********************************/
/**** Getter & Setter di IA ******/
/*********************************/
/*********************************/

IA.prototype.setStrategy = function(strategy) {
	this.problem.strategy = algoMap[strategy];
};

IA.prototype.setOrder = function(order) {
	this.problem.setOrder(order);
	//debug(order);
};


IA.prototype.setTree = function(tree) {
	this.problem.setTree(tree);
}

IA.prototype.setOptions = function(options) {
	this.settings.setOptions(options);
}




/*****************************/
/*****************************/
/******** Metodi di IA *******/
/*****************************/
/*****************************/

IA.prototype.newTree = function(tree) {
	this.problem.setTree(tree);
	this.treemanager = new TreeManager(this.problem.getTree.bind(this.problem));
}

IA.prototype.reset = function() {
	this.problem.frontier = [];
	this.problem._tree = this.problem._startingTree;
	this.treemanager.update();
};

IA.prototype.draw = function(container) {
	this.treemanager.draw(container);
};

IA.prototype.update = function() {
	this.treemanager.update();
};

IA.prototype.step = function() {
	this.control.step();
};

IA.prototype.play = function() {
	this.control.play();
};

IA.prototype.stop = function() {
	this.control.stop();
};
