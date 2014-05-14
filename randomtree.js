
// Returns a random number between min and max
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Returns the log10 of val (awesome eh?)
 */
function log10(val) {
  return Math.log(val) / Math.LN10;
}

/**
 * Returns a random integer between min and max
 */
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


/**
 *
 * @param branching
 * @param depth_limit
 * @param complete
 * @param leaf_flag: if true, generate goals only in leafs
 * @returns the root object 
 */
function randomTree(branching, depth_limit, complete_flag, leaf_flag ){
    branching = (typeof branching === 'undefined' || isNaN(branching))? getRandomInt(2,4): branching;
    depth_limit = (typeof depth_limit === 'undefined' || isNaN(depth_limit))? getRandomInt(2,4): depth_limit;
    var node_limit_wrapper = new Object({
        node_counter: "0",
	targets_count: 0
    });
    var root = [{
        name: node_limit_wrapper.node_counter++,
        depth: 0,
        cost: getRandomInt(1,10),
        h: 1*getRandomInt(1,50)
    }];
    
    var leafs = [];
    
    root[0].children = generateChildrens(
        root[0],
        branching,
        depth_limit,
        complete_flag,
	leaf_flag,
	node_limit_wrapper,
	leafs
    );
    
    //qui fai una funzinoe che inserisce almeno un goal
    if (node_limit_wrapper.targets_count == 0){
      var ind = getRandomInt(0,leafs.length-1);
      //var ind = leafs.length-1;
      leafs[ind].target = 1;
    }
    return root;
}


/**
 * @param node: the object node
 * @param branching: the branching factor
 * @param depth_limit: the maximum value for depth
 * @param complete: 0->tree is not complete, 1->tree is complete
 * @param leaf_flag: 1->goals are present only in leafs, 0->goals may be everywhere
 * @param nodes_limit: Object that contains counter for nodes and for targets
 * @param leafs: should be empty at the beginning, at the end of the recursive
 *	         call will contain an array of references to the leafs of the tree
 * @returns the children array
 */
function generateChildrens(node, branching, depth_limit, complete, leaf_flag, nodes_limit, leafs){

    if (complete){
      var num_childrens = branching;
    }
    else{
      var num_childrens = getRandomInt(0, branching);
    }
    if (node.name == "0" && num_childrens == 0){
      num_childrens += 2;
    }
    if (num_childrens == 1){
        num_childrens++; //atleaast 2
    }
    
    //http://en.wikipedia.org/wiki/K-ary_tree
    var max_nodes = (Math.pow(branching, depth_limit+1)-1)/(branching-1);
    var max_leaves = Math.pow(branching, depth_limit);
    //check if it is a leaf
    if (num_childrens == 0 || node.depth == depth_limit){
      if(leaf_flag){
	node.target = (getRandomInt(0, max_leaves) < 2)? 1 : 0;
	if (node.target == 1){
	  nodes_limit.targets_count++;
	}
      }
      leafs.push(node);
    }
    if (node.depth < depth_limit && num_childrens > 0){
        var childrens = [];
        for (var i = 0; i < num_childrens; i++){
	    //decide if the node will be target
	    //probability grows with node_count and decrease with targets_count
	    var is_target = 0;

	    if(!leaf_flag){
	      is_target = (getRandomInt(0, max_nodes) < 6)? 1 : 0;
	      if (is_target != 0){
		nodes_limit.targets_count++;
	      }
	    }
            childrens.push(new Object({
                name: String(nodes_limit.node_counter++),
                depth: node.depth+1,
                cost: getRandomInt(1,10),
                target: is_target,
                h: parseInt(depth_limit/(node.depth+1)*getRandomArbitrary(1,5)) //decreases with depth
            }));
            childrens[i].children = generateChildrens(childrens[i], branching, depth_limit, complete, leaf_flag, nodes_limit, leafs);
        }
        return childrens;
      }
      else{
        return [];
    }

}