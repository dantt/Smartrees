algoMap = {
    Dfs: Dfs,
    Bfs: Bfs,
    Ucs: Ucs,
    Dls: Dls,
    Ids: Ids
};

/**
 * Assumes that frontier is not empty
 * @param frontier
 */
function pickFirst(frontier, nodesFound){
    var node = frontier[0];
    frontier.shift();
    debug("nodo:" + node.name);
    nodesFound++;
    node.selected = nodesFound;
    document.dispatchEvent(new Event('updated'));
    return node;
}


function Bfs(frontier, tree, options, nodesFound){
    if (frontier.length == 0){
        debug('frontiera vuota fail');
		document.dispatchEvent(new Event('emptyfringe'));
        return false;
    }
    var current_node = pickFirst(frontier, nodesFound);
    if (current_node.target == 1){
        debug("goal raggiunto");
        return current_node;
    }
    if (typeof(current_node.children) != 'undefined') {
        for (var i = 0; i < current_node.children.length; i++){
            frontier.push(current_node.children[i]);
        }
    }
    return true;
}


function Dfs(frontier, tree, options, nodesFound){
    if (frontier.length == 0){
        debug('frontiera vuota fail');
		document.dispatchEvent(new Event('emptyfringe'));
        return 1;
    }
    var current_node = pickFirst(frontier, nodesFound);
    if (current_node.target == 1){
        debug("goal raggiunto");
        return current_node;
    }
    if (typeof(current_node.children) != 'undefined') {
        for (var i = 0; i < current_node.children.length; i++){
            frontier.unshift(current_node.children[current_node.children.length - i -1]);
        }
    }
    return 2;
}

function Dls(frontier, tree, options, nodesFound) {
    if (frontier.length == 0){
        debug('frontiera vuota fail');
		document.dispatchEvent(new Event('emptyfringe'));
        return false;
    }
    var current_node = pickFirst(frontier, nodesFound);
    if (current_node.target == 1){
        debug("goal raggiunto");
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
            for (i = 0; i < current_node.children.length; i++) {
                frontier.unshift(current_node.children[current_node.children.length - i - 1]);
            }
        }
    }
    return true;
}

function Ids(frontier, tree, options, nodesFound){
    if (frontier.length == 0) {
        debug('aumento lim a: ' + ++options.limit);
        restoreTree(tree[0]);
        frontier.push(tree[0]);
        document.dispatchEvent(new Event('updated'));
        nodesFound = 0;
        return 3; //facciamo finta che 3 significhi restart
    }
    else {
        return Dls(frontier, tree, options, nodesFound);
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
            else if ( old_f[0].pathCost < ord[0].pathCost ){
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
