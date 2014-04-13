	//IA_PROJECT INIT CODE (will be moved)
	mIA = new IA(treePresets.preset2);
	
	
	//DOM INIT CODE	
	$(document).ready(function() {
		
		// Event Listeners
		document.addEventListener('updated', mIA.update.bind(mIA), false);
	
	
		//Navigation how-to: on first pageload load every template you'll need in a div inside #maincontainer
		//It will be hidden by default (mark it active otherwise). Give it an ID	
		$('#sidemenu a').click(function(event) {
			event.preventDefault();
			navigateTo(this.hash);
		});
		
		function navigateTo(hash) {
			$('#maincontainer div').removeClass('active');
			debug('navigate to #maincontainer ' + hash);
			$('#maincontainer ' + hash).addClass('active');
		};
		
		
		//The template loader $.load() accepts a callback where you can do your init logic, if any
		//When the callback is fired, every template element has been loaded into the DOM
		
		$('#homepage').load('templates/homepage.html', function() {
		
			mIA.draw('treecontainer');
			
			$("#step").click(function() {mIA.step();});
			$("#play").click(function() {mIA.play();});
			$("#stop").click(function() {mIA.stop();});
			
			$('#algo').change(function() {
				var selected = $('#algo option:selected').val();
				mIA.setStrategy = selected;
			});
			
		});
		
		$('#presets').load('templates/presets.html', function() {
		
			$('#preset1').click(function() { 
				$('#treecontainer').empty();
				mIA.setTree(treePresets.preset1);
				mIA.draw('treecontainer');
				navigateTo('#homepage');
			});
			
			$('#preset2').click(function() {	
				$('#treecontainer').empty();
				mIA.setTree(treePresets.preset2);
				mIA.draw('treecontainer');
				navigateTo('#homepage');				
			});
		
		});
		
		$('#settings').load('templates/settings.html', function() {
		
			$('#optionsform').submit(function(event) {
				event.preventDefault();
				console.log($('form').serialize());
			});
		
		});
		
	});
	