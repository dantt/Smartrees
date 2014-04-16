

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function randomTree(branching=0, depth=0, nodes=0){
  //if (nodes != 0){}
  branching = (branching == 0)? getRandomInt(2,10): branching;
  depth = (depth == 0)? getRandomInt(1,10): depth;
  nodes = (nodes == 0)? getRandomInt(1,50): nodes;
  var matrix = Array();
  var cur_level = 0;
  var last_node_name = "A";
  while(nodes > 0 && cur_level <= depth){
    if(cur_level == 0){//we are in the first level
      var childrens = getRandomInt(0, branching);
      var node = new Object({
	name: last_node_name;
	children: 
      })
      matrix.push([])
    }
  }
}

//function getRandomNode(){}