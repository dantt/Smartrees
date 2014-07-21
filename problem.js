/**********************************/
/**********************************/
/** Problem constructor*/
/**********************************/
/**********************************/

function Problem(tree, saveStartTreeFlag){
    this.setTree(tree, saveStartTreeFlag);
}

/**
 * Prints a string representation of a tree object
 * @param tree
 */
function printTree(tree){
    var seen = [];
    var stringami = JSON.stringify(tree, function(key, val) {
        if (typeof val == "object") {
            if (seen.indexOf(val) >= 0)
                return;
            seen.push(val);
        }
        return val;
    });
    debug(stringami);
}




/*********************************/
/*********************************/
/***** Problem fields *****/
/*********************************/
/*********************************/

Problem.prototype._frontier = [];
Problem.prototype._tree;
Problem.prototype._nodesFound = 0;
Problem.prototype.strategy;
Problem.prototype._options = {
    limit: 2,
    iteration: 0,
    order: 'ltr'
}




/*********************************/
/*********************************/
/** Getter & Setter Problem ***/
/*********************************/
/*********************************/


Problem.prototype.getFrontier = function() {
    return this._frontier;
};
Problem.prototype.getTree = function(){
    return this._tree;
};

Problem.prototype.setOrder = function(order){
    this._options.order = order;
}

Problem.prototype.setTree = function(tree, startTreeFlag){
    
    if (typeof startTreeFlag === 'undefined'){startTreeFlag = true;}
  
    this._tree = tree;
    //this.preElab();
    var seen = [];
    var stringami = "{}";
    if (startTreeFlag == true){
        var stringami = JSON.stringify(tree, function(key, val) {
            if (typeof val == "object") {
                if (seen.indexOf(val) >= 0)
                    return;
                seen.push(val);
            }
            return val;
        });
    }
    //debug(stringami);
    this._startingTree = JSON.parse(stringami);
    this._tree[0].pathCost = 0;
    this._tree[0].depth = 0;
    this._tree[0].f = 0;
    this._frontier = [this._tree[0]];
    this._nodesFound = 0;
    this._options.limit = 0;
    this._options.iteration = 0;
};


/**
 * Implements the 'limit increase' in Ids
 * Reset the tree and its status
 * @param startTree
 * @param cur_limit
 * @param cur_iteration
 */
Problem.prototype.idsIterate = function(startTree, cur_limit, cur_iteration){
  var count = this._nodesFound;
  this.setTree(startTree);
  this._options.limit = cur_limit;
  this._options.iteration = cur_iteration;
  this._nodesFound = count;
}

/**
 * Runs a step on the tree search
 * @returns {*}
 */
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
	this.idsIterate(this._startingTree, this._options.limit, this._options.iteration);
        /*this.setTree(this._startingTree);
        this._frontier.length = 0;
        this._frontier.push(this._tree[0]);*/
        
        //Move this in alg.js
	if (typeof window !== 'undefined')
        	document.dispatchEvent(new Event('updated'));
        return true;
    }

}

/***
 * THIS IS NOT USED ANYMORE
 */
Problem.prototype.preElab = function(){
    if(typeof this._tree != 'undefined'){
        var matrix = new Array();
        var counter = 0;
        process_node(this._tree[0], matrix);
        for(var i = 0; i < matrix.length; i++){
            counter = 0;
            for(var j = 0; j < matrix[i].length; j++){
                matrix[i][j].position = counter;
                counter++;
            }
        }
    }
}

/***
 * Same for this one
 */
function process_node(node, matrix){
    if (typeof node.f == 'undefined'){ //siamo nella radice
        node.pathCost = 0;
        node.depth = 0;
	node.f = node.h + node.pathCost;
        matrix.push([node]);
    }
    if (typeof(node.children) != 'undefined') { //
        for (var i = 0; i < node.children.length; i++) {
            node.children[i].depth = node.depth + 1;
            node.children[i].pathCost = node.pathCost + node.children[i].cost;
	    node.children[i].f = node.children[i].pathCost + node.children[i].h;
            if(typeof matrix[node.children[i].depth] == 'undefined'){
                matrix.push([node.children[i]]);
            }
            else{
                matrix[node.children[i].depth].push(node.children[i]);
            }
            process_node(node.children[i], matrix);
        }
    }
}

