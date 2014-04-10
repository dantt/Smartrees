	treeData = [
	  {
		"name": "A",
		"children": [
		  {
			"name": "B",
			"cost": 1,
			"children": [
			  {
				"name": "C",
				"cost": 2,
			  },
			  { 
				"name": "D",
				"target": 1,
				"cost": 3,
			  },
			]
		  },
		  {
			"name": "E",
			"cost": 5,
		  }
		]
	  }
	];	
	
	probl = new Problem(treeData);
	probl.strategy = UniformCost;
	control = new Controller(probl);
	
	tm = new TreeManager(probl.getTree.bind(probl));
	tm.draw('treecontainer');
	
	var event = new Event('build');

	// Listen for the event.
	//elem.addEventListener('build', function (e) { }, false);

	// Dispatch the event.
	//elem.dispatchEvent(event);
	
	$(document).ready(function() {
		document.getElementById("step").onclick = function() {control.step();};
		document.getElementById("play").onclick = function() {control.play();};
		document.getElementById("stop").onclick = function() {control.stop();};
	});
