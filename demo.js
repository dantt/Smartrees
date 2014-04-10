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
	
	

	
	$(document).ready(function() {
		$('#maincontainer').load('templates/homepage.html', function() {
			probl = new Problem(treeData);
			probl.strategy = UniformCost;
			control = new Controller(probl);
			
			tm = new TreeManager(probl.getTree.bind(probl));
			tm.draw('treecontainer');
			
			// Event Listeners
			document.addEventListener('updated', tm.update.bind(tm), false);
		});
		
		$('#settingslink').click(function(event) {
			event.preventDefault();
			$('#maincontainer').load('templates/settings.html');
		});
		
	});
	