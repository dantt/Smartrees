	treeData = [
	  {
		"name": "1",
		"selected": 1,
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
	
	var probl = new Problem(treeData);
	probl.strategy = UniformCost;
	var control = new Controller(probl);
	
	tm = new TreeManager(probl);
	tm.draw('treecontainer');
	
	$(document).ready(function() {
		document.getElementById("step").onclick = function() {control.step();};
		document.getElementById("play").onclick = function() {control.play();};
		document.getElementById("stop").onclick = function() {control.stop();};
	});