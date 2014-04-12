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
	
	
	//IA_PROJECT INIT CODE (will be moved and namespaced)
	probl = new Problem(treeData);
	probl.strategy = Dfs;
	
	control = new Controller(probl);
	
	tm = new TreeManager(probl.getTree.bind(probl));
	
	
	//DOM INIT CODE	
	$(document).ready(function() {
		
		// Event Listeners
		document.addEventListener('updated', tm.update.bind(tm), false);
	
	
		//Navigation how-to: on first pageload load every template you'll need in a div inside #maincontainer
		//It will be hidden by default (mark it active otherwise). Give it an ID	
		$('#sidemenu a').click(function(event) {
			event.preventDefault();
			$('#maincontainer div').removeClass('active');
			debug('navigate to #maincontainer ' + this.hash);
			$('#maincontainer ' + this.hash).addClass('active');
		});
		
		
		//The template loader $.load() accepts a callback where you can do your business logic, if any
		//When the callback is fired, every template element has been loaded into the DOM
		
		$('#homepage').load('templates/homepage.html', function() {
		
			tm.draw('treecontainer');
			
			$("#step").click(function() {control.step();});
			$("#play").click(function() {control.play();});
			$("#stop").click(function() {control.stop();});
			
			$('#algo').change(function() {
				var selected = $('#algo option:selected').val();
				probl.strategy = algoMap[selected];
			});
			
		});
		
		$('#settings').load('templates/settings.html', function() {
		
			$('#optionsform').submit(function(event) {
				event.preventDefault();
				console.log($('form').serialize());
			});
		
		});
		
	});
	