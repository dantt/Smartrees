/**********************************/
/**********************************/
/******* Costruttore di IA  *******/
/**********************************/
/**********************************/

function IA(tree){
  this.problem = new Problem(tree);
  this.problem.strategy = algoMap[simulationConfig.defaultStrategy];
  this.control = new Controller(this.problem);
  this.treemanager = new TreeManager(this.problem.getTree.bind(this.problem));
  this.settings = new Config();
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

IA.prototype.setTree = function(tree) {
	this.problem.setTree(tree);
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
