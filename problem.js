/**********************************/
/**********************************/
/** Costruttore di Problem (LOL)  */
/**********************************/
/**********************************/

function Problem(tree){
    this.setTree(tree);
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
Problem.prototype._options = {
    limit: 1,
    iteration: 0
}




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

Problem.prototype.setTree = function(tree){
    this._tree = tree;
    var seen = [];

    var stringami = JSON.stringify(tree, function(key, val) {
        if (typeof val == "object") {
            if (seen.indexOf(val.name) >= 0) //then we have already visited this node
                return;
            seen.push(val.name);
        }
        return val;
    });
    debug(stringami);
    this._startingTree = JSON.parse(stringami);

    this._frontier = [this._tree[0]];
    this._nodesFound = 0;
};





/*****************************/
/*****************************/
/***** Metodi di Problem *****/
/*****************************/
/*****************************/
Problem.prototype.step = function(){
    var result = this.strategy(this._frontier, this._tree, this._options, this._nodesFound);
    if (typeof result === 'object' && result.target == 1){ //nodo goal
        return result;
    }
    if (result == 0){ // frontiera vuota
        return false;
    }
    if (result == 1){ //fatto uno step normale
        this._nodesFound++;
        return true;
    }
    if (result == 2){ //fatta un'itearazione su ids
        debug('aumento lim a: ' + ++this._options.limit);
        this.setTree(this._startingTree);
        this._frontier.length = 0;
        this._frontier.push(this._tree[0]);
        document.dispatchEvent(new Event('updated'));
        return true;
    }

}

/*
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
 */

