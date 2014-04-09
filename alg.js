function Problem(tree){
  this._tree = tree;
}
Problem.prototype._frontier = [];
Problem.prototype._tree;
Problem.prototype._isStarted = false;
Problem.prototype.getTree = function(){
  return this._tree;
};

Problem.prototype.step = function(){
  // se non ho gia' iniziato faccio gli step pre-algoritmo
  // prendo la radice e la metto in frontiera
  if (!this._isStarted){
    this._frontier = [];
    this._frontier.push(this._tree[0]);
    this._isStarted = true;
  }
  if (this._frontier.length == 0){
    console.log('frontiera vuota fail');
    return false;
  }
  var current_node = this._frontier[0];
  this._frontier.shift();
  console.log("nodo:" + current_node.name);
  if (current_node.target == 1){
    console.log("goal raggiunto");
    return current_node;
  }
  if (typeof(current_node.children) != 'undefined') {
    this._frontier = this.strategy(current_node, this._frontier);
  }
  var string = ""
  for (i in this._frontier){
    string += this._frontier[i].name+",";
  }
  console.log("frontier: [" + string + "]");
};


Problem.prototype.strategy;

function Controller(prob){
  this._problem = prob;
  
}
Controller.prototype._intervalId;
Controller.prototype._problem;
Controller._isPlaying = false;

Controller.prototype.step = function(){
  this._problem.step();
};
//HERE BE DRAGONS
Controller.prototype.play = function(){
  console.log("method play");
  this._isPlaying = true;
  $('#img_play').attr("src", "images/play_h.png");
  $('#img_stop').attr("src", "images/pause.png");
  this.step();
  this._intervalId = setInterval(this.step.bind(this), 2000);
};
Controller.prototype.stop = function(){
  clearInterval(this._intervalId);
  this._isPlaying = false;
  $('#img_play').attr("src", "images/play.png");
  $('#img_stop').attr("src", "images/pause_h.png");
};


/* 
  Implements Depth first-search
*/
function Dfs(node, frontier){
  for (i = 0; i < node.children.length; i++){
    frontier.unshift(node.children[node.children.length - i -1]);
  }
  return frontier;
}

/*
  Implements Breadth first-search
*/
function Bfs(node, frontier){
  for (i = 0; i < node.children.length; i++){
    frontier.push(node.children[i]);
  }
  return frontier;
}

/*
  Implements Uniform Cost search
*/
function UniformCost(node, frontier){
  if (node.pathCost == 'undefined') { //we are in root
    node.pathCost = 0;
  }
  var ord = [];
  for (i = 0; i < node.children.length; i++){
    node.children[i].pathCost = node.pathCost + node.children[i].cost;
    ord.push({"index":i, "pathCost": node.children[i].pathCost});
  }
  for (i in ord){
    console.log(ord[i]["index"]);
  }

  return frontier;
}
