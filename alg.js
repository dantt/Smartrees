algoMap = {
	Dfs: Dfs,
	Bfs: Bfs,
	UniformCost: UniformCost
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
  if (typeof(node.pathCost) == 'undefined') { //we are in root
    node.pathCost = 0;
  }
  var ord = [];
  for (i = 0; i < node.children.length; i++){ //loop trough children, update pathCost and insert info in ord
    node.children[i].pathCost = node.pathCost + node.children[i].cost;
    ord.push({index:i, pathCost: node.children[i].pathCost});
  }
  //loop trough ord and sort the nodes
  //BUBBLE SORT FTW
  for (i = 0; i < ord.length; i++){
    for (j = i; j < ord.length; j++){
      if (ord[j].pathCost < ord[i].pathCost){
	//then swap j and i
	var tmp = ord[j];
	ord[j] = ord[i];
	ord[i] = tmp;
      }  
    }
  }
  
  k = 0;
  old_f = frontier;
  frontier = [];
  while ( old_f.length > 0 || ord.length > 0){
    if ( old_f.length == 0 ){
      while(ord.length > 0){
	frontier.push(node.children[ord[0].index]);
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
    else{
      frontier.push(node.children[ord[0].index]);
      ord.shift();
    }
    k++;
  }
  
  return frontier;
}
