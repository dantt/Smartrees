algoMap = {
    Dfs: Dfs,
    Bfs: Bfs,
    UcsOld: UcsOld,
    Lds: Lds,
    Ids: Ids,
    GreedyOld: GreedyOld,
    AStarOld: AStarOld,
    UcsNo: UcsNoRtl,
    Ucs: Ucs,
    AStar: AStar,
    Greedy: Greedy
};


/**
 * Merges two list of nodes into frontier.
 * Precondition is that frontier is already ordered after the parameter returned by getP (increasing).
 * 
 * @param frontier: the current frontier
 * @param childrens: the array containing the childrens of the node to expand
 * @param getP: a function that takes a node in input and returns the parameter for the comparison
 * 
 * example: function f(node){returns node.h;}
 * @returns nothing, frontier will contain the children nodes in the correct place.
 */
function mergeFrontier(frontier, childrens, getP){
      for (var i = 0; i < childrens.length; i++) {
        var inserted = false;
        for (var j = 0; j < frontier.length && inserted == false; j++){
          if (getP(childrens[i]) < getP(frontier[j])){
            frontier.insert(j,childrens[i]);
            inserted = true;
          }
        }
        if (inserted == false){
          frontier.push(childrens[i]);
        }
      }
}

//This is ugly and will probably kill your cat
function getPath(node) {
    if (typeof node.parent === 'undefined')
        return '#' + node.name;
    else
        return getPath(node.parent) +' #' + node.name;
};


function checkFrontier(frontier) { 
	 if (frontier.length == 0){
        	debug('frontiera vuota fail');
        	if(typeof window !== 'undefined')
       			document.dispatchEvent(new Event('emptyfringe'));
        	return 0;
        }
        else {
        	return 1;
        }
};


function checkSuccess(current_node) {
	if (current_node.target == 1){
		debug("goal raggiunto");
		if(typeof window !== 'undefined')
			document.dispatchEvent(new CustomEvent('goalfound', {'detail': { 'target': current_node.name, 'path': getPath(current_node) }}));
		return current_node;
	}
	else {
		return 0;
	}
};


function updated() {
	if(typeof window !== 'undefined')
		 document.dispatchEvent(new Event('updated'));
};



/**
 * Assumes that frontier is not empty
 * @param frontier
 * @param nodesFound
 */
function pickFirst(frontier, nodesFound){
    debug("pickFist, nodo:" + frontier[0].name + " " + (nodesFound+1));
    frontier[0].selected =  nodesFound+1;
    updated();
    return frontier.shift();
}


/***
 * Random coded
 */
function AStarOld(frontier, tree, options, nodesFound){

    if (checkFrontier(frontier) == 0)
    	return 0;
    	
    var current_node = pickFirst(frontier, nodesFound);
    
    if (checkSuccess(current_node) != 0)
    	return current_node;
    	    
    var ord = [];
    if (typeof(current_node.children) != 'undefined') {
        for (var i = 0; i < current_node.children.length; i++) {
            ord.push({
                index:i,
                f: current_node.children[i].f,
                depth: current_node.children[i].depth,
                position: current_node.children[i].position,
                getParam: function(){return this.f;}  //don't do this at home kids
            });
        }

        ord = bubbleSorta(ord, options.order);
        var k = 0;
        var old_f = frontier.splice(0);
        frontier.length = 0;

        while ( (old_f.length > 0 || ord.length > 0)){
            debug("length: " + old_f.length + " " + ord.length);

            if ( old_f.length == 0 ){
                while(ord.length > 0){
                    frontier.push(current_node.children[ord[0].index]);
                    ord.shift();
                }
            }
            else if ( ord.length == 0){
                while( old_f.length > 0){
                    frontier.push(old_f.shift());
                }
            }
            else if ( old_f[0].f < ord[0].f ){
                frontier.push(old_f.shift());
            }
            else if ( old_f[0].f == ord[0].f ){
                if (old_f[0].depth < ord[0].depth){
                    frontier.push(old_f.shift());
                }
                else if (old_f[0].depth == ord[0].depth){
                    if (options.order == 'ltr'){
                        if (old_f[0].position < ord[0].position){
                            frontier.push(old_f.shift());
                        }
                        else{
                            frontier.push(current_node.children[ord[0].index]);
                            ord.shift();
                        }
                    }
                    else{ //rtl
                        if (old_f[0].position < ord[0].position){
                            frontier.push(current_node.children[ord[0].index]);
                            ord.shift();
                        }
                        else{
                            frontier.push(old_f.shift());
                        }
                    }
                }
                else{
                    frontier.push(current_node.children[ord[0].index]);
                    ord.shift();
                }
            }
            else{
                frontier.push(current_node.children[ord[0].index]);
                ord.shift();
            }
            k++;
        }

        var string = "[";
        for (i in frontier){
            string += frontier[i].name + ": " + frontier[i].h + ", ";
        }
        string += "]";
        debug(string);
    }
    return true;
}



function GreedyOld(frontier, tree, options, nodesFound){
    if (checkFrontier(frontier) == 0)
    	return 0;
    	
    var current_node = pickFirst(frontier, nodesFound);
    
    if (checkSuccess(current_node) != 0)
    	return current_node;
    	
    var ord = [];
    if (typeof(current_node.children) != 'undefined') {
        for (var i = 0; i < current_node.children.length; i++) {
            ord.push({
                index:i,
                h: current_node.children[i].h,
                depth: current_node.children[i].depth,
                position: current_node.children[i].position,
                getParam: function(){return this.h;}  //don't do this at home kids
            });
        }
	ord.sort(function(a, b){
	  return a.h - b.h;
	})
        //ord = bubbleSorta(ord, options.order);
        var k = 0;
        var old_f = frontier.splice(0);
        frontier.length = 0;

        while ( (old_f.length > 0 || ord.length > 0)){
            debug("length: " + old_f.length + " " + ord.length);

            if ( old_f.length == 0 ){
                while(ord.length > 0){
                    frontier.push(current_node.children[ord[0].index]);
                    ord.shift();
                }
            }
            else if ( ord.length == 0){
                while( old_f.length > 0){
                    frontier.push(old_f.shift());
                }
            }
            else if ( old_f[0].h < ord[0].h ){
                frontier.push(old_f.shift());
            }
            else if ( old_f[0].h == ord[0].h ){
                if (old_f[0].depth < ord[0].depth){
                    frontier.push(old_f.shift());
                }
                else if (old_f[0].depth == ord[0].depth){
                    if (options.order == 'ltr'){
                        if (old_f[0].position < ord[0].position){
                            frontier.push(old_f.shift());
                        }
                        else{
                            frontier.push(current_node.children[ord[0].index]);
                            ord.shift();
                        }
                    }
                    else{ //rtl
                        if (old_f[0].position < ord[0].position){
                            frontier.push(current_node.children[ord[0].index]);
                            ord.shift();
                        }
                        else{
                            frontier.push(old_f.shift());
                        }
                    }
                }
                else{
                    frontier.push(current_node.children[ord[0].index]);
                    ord.shift();
                }
            }
            else{
                frontier.push(current_node.children[ord[0].index]);
                ord.shift();
            }
            k++;
        }

        var string = "[";
        for (i in frontier){
            string += frontier[i].name + ": " + frontier[i].h + ", ";
        }
        string += "]";
        debug(string);
    }
    return 1;
}


function Bfs(frontier, tree, options, nodesFound){
    if (checkFrontier(frontier) == 0)
    	return 0;
    	
    var current_node = pickFirst(frontier, nodesFound);
    
    if (checkSuccess(current_node) != 0)
    	return current_node;
    	
    if (typeof(current_node.children) != 'undefined') {
      for (var i = 0; i < current_node.children.length; i++){
        frontier.push(current_node.children[i]);
      }
    }
    return 1;
}


function Dfs(frontier, tree, options, nodesFound){
    if (checkFrontier(frontier) == 0)
        return 0;
        
    var current_node = pickFirst(frontier, nodesFound);
    
    if (checkSuccess(current_node) != 0)
        return current_node;
        
    if (typeof(current_node.children) != 'undefined') {
      for (var i = 0; i < current_node.children.length; i++){
        frontier.unshift(current_node.children[current_node.children.length - i -1]);
      }
    }
    return 1;
}



function DfsOld(frontier, tree, options, nodesFound){
    if (checkFrontier(frontier) == 0)
    	return 0;
    	
    var current_node = pickFirst(frontier, nodesFound);
    
    if (checkSuccess(current_node) != 0)
    	return current_node;
    	
    if (typeof(current_node.children) != 'undefined') {
        if(options.order == 'ltr'){
            for (var i = 0; i < current_node.children.length; i++){
                frontier.unshift(current_node.children[current_node.children.length - i -1]);
            }
        }
        else if(options.order == 'rtl'){
            for (var i = current_node.children.length-1; i >= 0; i--){
                frontier.unshift(current_node.children[current_node.children.length - i -1]);
            }
        }
    }
    return 1;
}


function Lds(frontier, tree, options, nodesFound) {
    if (checkFrontier(frontier) == 0)
    	return 0;
    	
    var current_node = pickFirst(frontier, nodesFound);
    
    if (checkSuccess(current_node) != 0)
    	return current_node;

    if (current_node.children && options.limit) {
      updateChildrens(current_node);
      for (i = 0; i < current_node.children.length; i++) {
        frontier.unshift(current_node.children[current_node.children.length - i - 1]);
      }
    }
    return 1;
}


function Ids(frontier, tree, options, nodesFound){
    if (frontier.length == 0) {
        return 2; //facciamo finta che 2 significhi restart
    }
    else {
        return Lds(frontier, tree, options, nodesFound);
    }

}


function bubbleSorta(array, criteria){
    for (var i = 0; i < array.length; i++){
        for (var j = i; j < array.length; j++){
            if (array[j].getParam() < array[i].getParam()){
                //then swap j and i
                var tmp = array[j];
                array[j] = array[i];
                array[i] = tmp;
            }
            else if (array[j].getParam() == array[i].getParam()){
                //with the same pathCost i should pick the node
                //based on his depth and 'leftiness'
                if (criteria == 'ltr'){
                    //pick the highest leftest one
                    if (array[j].depth < array[i].depth){
                        var tmp = array[j];
                        array[j] = array[i];
                        array[i] = tmp;
                    }
                    else if (array[j].depth == array[i].depth && array[j].position < array[i].position){
                        var tmp = array[j];
                        array[j] = array[i];
                        array[i] = tmp;
                    }
                }
                else{ //rtl
                    //pick the highest rightest one
                    if (array[j].depth < array[i].depth){
                        var tmp = array[j];
                        array[j] = array[i];
                        array[i] = tmp;
                    }
                    else if (array[j].depth == array[i].depth && array[j].position > array[i].position){
                        var tmp = array[j];
                        array[j] = array[i];
                        array[i] = tmp;
                    }
                }
            }
        }
    }
    return array;
}


/*
 Implements Uniform Cost search
 */
function UcsOld(frontier, tree, options, nodesFound){
    if (checkFrontier(frontier) == 0)
    	return 0;
    	
    var current_node = pickFirst(frontier, nodesFound);
    
    if (checkSuccess(current_node) != 0)
    	return current_node;
    	
    var ord = [];
    if (current_node.children) {
        for (var i = 0; i < current_node.children.length; i++) {
            //current_node.children[i].pathCost = current_node.pathCost + current_node.children[i].cost;
            ord.push({
                index:i,
                pathCost: current_node.children[i].pathCost,
                depth: current_node.children[i].depth,
                position: current_node.children[i].position,
                getParam: function(){return this.pathCost;} //don't do this at home kids
            });
        }

        ord = bubbleSorta(ord, options.order);
        var k = 0;
        var old_f = frontier.splice(0);
        frontier.length = 0;

        while ( (old_f.length > 0 || ord.length > 0)){
            debug("length: " + old_f.length + " " + ord.length);

            if ( old_f.length == 0 ){
                while(ord.length > 0){
                    frontier.push(current_node.children[ord[0].index]);
                    ord.shift();
                }
            }
            else if ( ord.length == 0){
                while( old_f.length > 0){
                    frontier.push(old_f.shift());
                }
            }
            else if ( old_f[0].pathCost < ord[0].pathCost ){
                frontier.push(old_f.shift());
            }
            else if ( old_f[0].pathCost == ord[0].pathCost ){
                if (old_f[0].depth < ord[0].depth){
                    frontier.push(old_f.shift());
                }
                else if (old_f[0].depth == ord[0].depth){
                    if (options.order == 'ltr'){
                        if (old_f[0].position < ord[0].position){
                            frontier.push(old_f.shift());
                        }
                        else{
                            frontier.push(current_node.children[ord[0].index]);
                            ord.shift();
                        }
                    }
                    else{ //rtl
                        if (old_f[0].position < ord[0].position){
                            frontier.push(current_node.children[ord[0].index]);
                            ord.shift();
                        }
                        else{
                            frontier.push(old_f.shift());
                        }
                    }
                }
                else{
                    frontier.push(current_node.children[ord[0].index]);
                    ord.shift();
                }
            }
            else{
                frontier.push(current_node.children[ord[0].index]);
                ord.shift();
            }
            k++;
        }

        var string = "[";
        for (i in frontier){
            string += frontier[i].name + ": " + frontier[i].pathCost + ", ";
        }
        string += "]";
        debug(string);
    }
    return 1;
}


function UcsNoRtl(frontier, tree, options, nodesFound){
    if (checkFrontier(frontier) == 0)
    	return 0;

    var current_node = pickFirst(frontier, nodesFound);
    
    if (checkSuccess(current_node) != 0)
    	return current_node;
    	
    var ord = [];
    if (current_node.children) {
        for (var i = 0; i < current_node.children.length; i++) {
	    frontier.push(current_node.children[i]);
        }
                
	frontier.sort(function (a, b) {
	  return a.pathCost-b.pathCost;
        })
	
        var string = "[";
        for (i in frontier){
            string += frontier[i].name + ": " + frontier[i].pathCost + ", ";
        }
        string += "]";
        debug(string);
    }
    return true;
}

Array.prototype.insert = function (index, item) {
  this.splice(index, 0, item);
};

function Ucs(frontier, tree, options, nodesFound){
    if (checkFrontier(frontier) == 0)
    	return 0;

    var current_node = pickFirst(frontier, nodesFound);
    
    if (checkSuccess(current_node) != 0)
    	return current_node;
    	
    if (current_node.children) {
      updateChildrens(current_node);
      mergeFrontier(frontier, current_node.children, function(node){return node.pathCost});
    }
    return 1;
}

function AStar(frontier, tree, options, nodesFound){
    if (checkFrontier(frontier) == 0)
    	return 0;
    	
    var current_node = pickFirst(frontier, nodesFound);
    
    if (checkSuccess(current_node) != 0)
    	return current_node;
    	    
     if (current_node.children) {
       updateChildrens(current_node);
       mergeFrontier(frontier, current_node.children, function(node){return node.f});
    }
    return 1;
}

function updateChildrens(node){
  
  for( var i = 0; i < node.children.length; i++){
    node.children[i].depth = node.depth + 1;
    node.children[i].pathCost = node.pathCost + node.children[i].cost;
    node.children[i].f = node.children[i].h + node.children[i].pathCost;
  }
  
}


function Greedy(frontier, tree, options, nodesFound){
    if (checkFrontier(frontier) == 0)
    	return 0;
    	
    var current_node = pickFirst(frontier, nodesFound);
//     
    if (checkSuccess(current_node) != 0)
    	return current_node;
    
    if (current_node.children) {
      mergeFrontier(frontier, current_node.children, function(node){return node.h});
    }
      /*
      for (var i = 0; i < current_node.children.length; i++) {
        var inserted = false;
        for (var j = 0; j < frontier.length && inserted == false; j++){
          if (current_node.children[i].h < frontier[j].h){
	    frontier.insert(j,current_node.children[i]);
            inserted = true;
          }
        }
        if (inserted == false){
          frontier.push(current_node.children[i]);
        }
      }
    }*/
    return 1;
}