/**********************************/
/**********************************/
/******* Costruttore di IA  *******/
/**********************************/
/**********************************/

function IA(tree){
    this.problem = new Problem(tree);
    this.problem.strategy = algoMap[iaSettings.getOption('defaultStrategy')];
    //this.control = new Controller(this.problem);
    this.treemanager = new TreeManager(this.problem.getTree.bind(this.problem));
    this.settings = iaSettings;
    this._isPlaying = false;

}





/*********************************/
/*********************************/
/******** Campi dati di IA *******/
/*********************************/
/*********************************/

IA.prototype.problem;
//IA.prototype.control;
IA.prototype.treemanager;
IA.prototype._intervalId;
IA._isPlaying = false;

IA.prototype.step = function(){
    this.problem.step();
};



//HERE BE DRAGONS.
//THIS WILL BE REFACTORED W/SIGNALS & TRIGGERS
IA.prototype.play = function(){
    debug("method play" + this._isPlaying);
    if (this._isPlaying == false){
      this._isPlaying = true;
      $('#img_play').attr("src", "images/play_h.png");
      $('#img_stop').attr("src", "images/pause.png");
      this.step();
      this._intervalId = setInterval(this.step.bind(this), iaSettings.getOption('simulationSpeed'));

    }
};



IA.prototype.stop = function(){
    if (this._isPlaying == true){
      clearInterval(this._intervalId);
      this._isPlaying = false;
      $('#img_play').attr("src", "images/play.png");
      $('#img_stop').attr("src", "images/pause_h.png");
    }
};

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

IA.prototype.reset = function() {/*
 this.problem.frontier = [];
 this.problem._tree = this.problem._startingTree;*/
    this.newTree(this.problem._startingTree);
    this.draw('treecontainer');
    $('#output').html("");
};

IA.prototype.draw = function(container) {
    this.treemanager.draw(container);
};

IA.prototype.update = function() {
    this.treemanager.update();
};

