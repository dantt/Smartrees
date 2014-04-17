

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function randomTree(branching=0, depth_limit=0, nodes_limit=0){
  branching = (branching == 0)? getRandomInt(2,10): branching;
  depth_limit = (depth_limit == 0)? getRandomInt(1,10): depth_limit;
  nodes_limit = (nodes_limit == 0)? getRandomInt(1,50): nodes_limit;
  var node_limit_wrapper = new Object({left_count: nodes_limit});
  debug(nodes_limit);
  var last_node_name = "A";
  var root = new Object({
    name: last_node_name,
    depth: 0,
    cost: getRandomInt(1,10),
  });
  //debug(nodes_limit);
  node_limit_wrapper.left_count--;
  //var num_childrens = getRandomInt(0, branching);
  //debug
  root.children = generateChildrens(
    root,
    branching,
    depth_limit,
    node_limit_wrapper
  );
  
  return root;
}

function generateChildrens(node, branching, depth_limit, nodes_limit){
  var num_childrens = getRandomInt(0, branching);
  //nodes_limit -= num_childrens;
  if (node.depth < depth_limit && nodes_limit.left_count > 0 && num_childrens > 0){
    var childrens = new Array();
    for (var i = 0; i < num_childrens && nodes_limit.left_count > 0; i++){
      childrens.push(new Object({
	name: String(nodes_limit.left_count),
	depth: node.depth+1,
	cost: getRandomInt(1,10),
      }));
      nodes_limit.left_count--;
      childrens[i].children = generateChildrens(childrens[i], branching, depth_limit, nodes_limit);
    }
    return childrens;
  }
  else{
    return [];
  }
}

/*
function booom(root){
  seen = [];
  return JSON.stringify(root, function(key, val) {
    if (typeof val == "object") {
        if (seen.indexOf(val) >= 0)
            return;
        seen.push(val);
    }
    return val;
  });
}


*/
















