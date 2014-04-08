treeData = [
  {
    "name": "1",
    "children": [
		  {
        "name": "2",
			  "cost": 1,
        "children": [
			    {
            "name": "3",
            "cost": 2,
            "pruned": 1,
          },
          { 
            "name": "4",
            "target": 1,
            "cost": 3,
          },
        ]
      },
      {
        "name": "5",
        "cost": 5,
      }
    ]
  }
];
/*
Prende l'albero e una funzione e ritorna:
 false - no soluzione
 un nodo - un nodo obiettivo
La funzione strategy prende un array di nodi e ne estrae 1 
secondo qualche criterio.
*/
function TreeSearch(tree, strategy) {
  root = tree[0];
  frontiera = [];
  frontiera.append(root);
  while (true) {
    if (frontiera.length == 0) {
      return false;
    }
    current_node = strategy(frontiera);
    if (current_node.target == 1){
      return current_node;
    }
    frontiera.append(Successors(current_node, tree));
  }
}
/*
function Expand(node, tree){
  successors = [];
}
*/











