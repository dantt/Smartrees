/**********************************/
/**********************************/
/** Costruttore di Problem (LOL)  */
/**********************************/
/**********************************/

function Problem(tree){
  this._tree = tree;
  this._frontier = [this._tree[0]];
}





/*********************************/
/*********************************/
/***** Campi dati di Problem *****/
/*********************************/
/*********************************/

Problem.prototype._frontier = [];
Problem.prototype._tree;
Problem.prototype._nodesFound = 0;
Problem.prototype.strategy;





/*********************************/
/*********************************/
/** Getter & Setter di Problem ***/
/*********************************/
/*********************************/


Problem.prototype.getFrontier = function() {
	return this._frontier;
};
Problem.prototype.getTree = function(){
  return this._tree;
};





/*****************************/
/*****************************/
/***** Metodi di Problem *****/
/*****************************/
/*****************************/


Problem.prototype.step = function(){

  if (this._frontier.length == 0){
    debug('frontiera vuota fail');
    return false;
  }
  var current_node = this._frontier[0];
  this._frontier.shift();
  debug("nodo:" + current_node.name);
  this._nodesFound++;
  current_node.selected =  this._nodesFound;
  document.dispatchEvent(new Event('updated'));
  if (current_node.target == 1){
    debug("goal raggiunto");
    return current_node;
  }
  if (typeof(current_node.children) != 'undefined') {
    this._frontier = this.strategy(current_node, this._frontier);
  }
  var string = ""
  for (i in this._frontier){
    string += this._frontier[i].name+",";
  }
  debug("frontier: [" + string + "]");
};


