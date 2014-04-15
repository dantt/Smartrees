algoMap = {
    Dfs: Dfs,
    Bfs: Bfs,
    Ucs: Ucs,
    Lds: Lds,
    Ids: Ids
};


//This is ugly and will probably kill your cat
function getPath(node) {
	if (typeof node.parent === 'undefined')
		return '#' + node.name;
	else
		return getPath(node.parent) +' #' + node.name;
};




/**
 * Assumes that frontier is not empty
 * @param frontier
 * @param nodesFound
 */
function pickFirst(frontier, nodesFound){
    debug("pickFist, nodo:" + frontier[0].name + " " + (nodesFound+1));
    frontier[0].selected =  nodesFound+1;
    document.dispatchEvent(new Event('updated'));
    return frontier.shift();
}


function Bfs(frontier, tree, options, nodesFound){
    if (frontier.length == 0){
        debug('frontiera vuota fail');
		document.dispatchEvent(new Event('emptyfringe'));
        return 0;
    }
    var current_node = pickFirst(frontier, nodesFound);
    if (current_node.target == 1){
        debug("goal raggiunto");
		document.dispatchEvent(new CustomEvent('goalfound', {'detail': { 'target': current_node.name, 'path': getPath(current_node) }}));
        return current_node;
    }
    if (typeof(current_node.children) != 'undefined') {
	//debug(options.order);
	if (options.order == 'ltr'){
	  for (var i = 0; i < current_node.children.length; i++){
	    frontier.push(current_node.children[i]);
	  }
	}
	else if (options.order == 'rtl'){
	  for (var i = current_node.children.length-1; i >= 0; i--){
	    frontier.push(current_node.children[i]);
	  }
	}
    }
    return 1;
}


function Dfs(frontier, tree, options, nodesFound){
    if (frontier.length == 0){
        debug('frontiera vuota fail');
		document.dispatchEvent(new Event('emptyfringe'));
        return 0;
    }
    var current_node = pickFirst(frontier, nodesFound);
    if (current_node.target == 1){
        debug("goal raggiunto");
		console.log(current_node.name);
		document.dispatchEvent(new CustomEvent('goalfound', {'detail': { 'target': current_node.name, 'path': getPath(current_node) }}));
        return current_node;
    }
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
    if (frontier.length == 0){
        debug('frontiera vuota fail');
		document.dispatchEvent(new Event('emptyfringe'));
        return false;
    }
    var current_node = pickFirst(frontier, nodesFound);
    if (current_node.target == 1){
        debug("goal raggiunto");
		document.dispatchEvent(new CustomEvent('goalfound', {'detail': { 'target': current_node.name, 'path': getPath(current_node) }}));
        return current_node;
    }
    if (typeof(current_node.depth) == 'undefined') { //we are in root
        current_node.depth = 0;
    }
    if (typeof(current_node.children) != 'undefined') {
        if (current_node.depth < options.limit) {
            for (var i = 0; i < current_node.children.length; i++) {
                current_node.children[i].depth = current_node.depth + 1;
            }
            if(options.order == 'ltr'){
	      for (i = 0; i < current_node.children.length; i++) {
                frontier.unshift(current_node.children[current_node.children.length - i - 1]);
	      }
	    }
	    else{
	      for (i = current_node.children.length - 1; i >= 0; i--) {
                frontier.unshift(current_node.children[current_node.children.length - i - 1]);
	      }
	    }
        }
    }
    return true;
}

function Ids(frontier, tree, options, nodesFound){
    if (frontier.length == 0) {
        return 2; //facciamo finta che 2 significhi restart
    }
    else {
        return Lds(frontier, tree, options, nodesFound);
    }

}


function restoreTree(node){
    node.selected = 0;
    if (typeof(node.children) != 'undefined'){
        for (var i in node.children){
            restoreTree(node.children[i]);
        }
    }
    return true;
}

function bubbleSorta(array){
    for (var i = 0; i < array.length; i++){
        for (var j = i; j < array.length; j++){
            if (array[j].pathCost < array[i].pathCost){
                //then swap j and i
                var tmp = array[j];
                array[j] = array[i];
                array[i] = tmp;
            }
        }
    }
    return array;
}


/*
 Implements Uniform Cost search
 */
function Ucs(frontier, tree, options, nodesFound){
    if (frontier.length == 0){
        debug('frontiera vuota fail');
		document.dispatchEvent(new Event('emptyfringe'));
        return false;
    }
    var current_node = pickFirst(frontier, nodesFound);
    if (current_node.target == 1){
        debug("goal raggiunto");
		document.dispatchEvent(new CustomEvent('goalfound', {'detail': { 'target': current_node.name, 'path': getPath(current_node) }}));
        return current_node;
    }
    if (typeof(current_node.pathCost) == 'undefined') { //we are in root
        current_node.pathCost = 0;
    }
    var ord = [];
    if (typeof(current_node.children) != 'undefined') {
        for (var i = 0; i < current_node.children.length; i++) {
            current_node.children[i].pathCost = current_node.pathCost + current_node.children[i].cost;
            ord.push({index:i, pathCost: current_node.children[i].pathCost});
        }

        ord = bubbleSorta(ord);

        var k = 0;
        var old_f = frontier.splice(0);
        //debug (old_f.length + " " + ord.length + " " + frontier.length);
        frontier.length = 0;

        while ( (old_f.length > 0 || ord.length > 0)){
           // debug (old_f.length + " " + ord.length + " " + frontier.length);
            if ( old_f.length == 0 ){
                while(ord.length > 0){
                    //debug(ord.length);
                    frontier.push(current_node.children[ord[0].index]);
                    ord.shift();
                }
            }
            else if ( ord.length == 0){
                while( old_f.length > 0){
                    //debug(old_f.length);
                    frontier.push(old_f.shift());
                }
            }
            else if ( old_f[0].pathCost <= ord[0].pathCost ){
                frontier.push(old_f.shift());
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
   return true;
}
