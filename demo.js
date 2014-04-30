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
            $("#restart").click(function() {mIA.reset();});
			
			$('#algo').change(function() {
				var selected = $('#algo option:selected').val();
				mIA.setStrategy(selected);
			});
			$('#order').change(function() {
				var selected = $('#order option:selected').val();
				mIA.setOrder(selected);
			});
			document.addEventListener('emptyfringe', function() {
				$('#output').html('<p class="warning">Empty frontier! Search failed</p>');
				mIA.stop();
			}, false);
			
			document.addEventListener('goalfound', function(e) {
				$('#output').html('<p class="success">Goal found in node ' + e.detail.target + '</p>');
				$('#output').append('<p class="success">Path to goal was: ' + e.detail.path + '</p>');
				mIA.stop();
			}, false);
			
			
		});
		
		$('#loadtree').load('templates/loadtree.html', function() {
			$('#formtree').submit(function(event) {
				event.preventDefault();
				//@WARNING: VALIDALO VALIDALO VALIDALO
				console.log($('#treepaster').val().replace("\\t", '').replace("\\n", ''));
				//much error safeness wow
				try {
				  var to_string;
				  to_string = JSON.parse($('#treepaster').val().replace("\\t", '').replace("\\n", ''));
				  mIA.newTree(to_string);
				  mIA.draw('treecontainer');
				  navigateTo('#homepage');
				} catch (err) {
				  var alertBox = $('<div id="myId" data-alert class="alert-box alert round alertClose"> The Json is not valid <a id="alertCloseLink" href="#" class="close">&times;</a></div>');
				  $('#loadTreeContainer').append(alertBox);
				  // qua in genere la proprieta' 'data-alert' del div dovrebbe provvedere alla chiusura ma inizializzandola
				  // con jquery stampa 'data-alert=""' e non funziona perche sembra un attributo
				  $("#alertCloseLink").bind("click",function(){
				    $('.alertClose').remove();
				  })

				}
								
			});
		});
		
		$('#presets').load('templates/presets.html', function() {
		
			$('#preset1').click(function() { 
				$('#treecontainer').empty();
				mIA.newTree(treePresets.preset1);
				mIA.draw('treecontainer');
				navigateTo('#homepage');
			});
			
			$('#preset2').click(function() {	
				$('#treecontainer').empty();
				mIA.newTree(treePresets.preset2);
				mIA.draw('treecontainer');
				navigateTo('#homepage');				
			});
			
			$('#preset3').click(function() {	
				$('#treecontainer').empty();
				mIA.newTree(treePresets.preset3);
				mIA.draw('treecontainer');
				navigateTo('#homepage');				
			});
			
			$('#preset4').click(function() {	
				$('#treecontainer').empty();
				mIA.newTree(treePresets.preset4);
				mIA.draw('treecontainer');
				navigateTo('#homepage');				
			});
		
		});
		
		$('#settings').load('templates/settings.html', function() {
		
			$('#optionsform input[type = "text"]').each(function() {
				$(this).val(mIA.settings.getOption($(this).attr('name')));
			});
		
			$('#optionsform').submit(function(event) {
				event.preventDefault();
				mIA.setOptions($('form').serialize());
				navigateTo('#homepage');
			});
		
		});
		
		
		$('#randomtree').load('templates/randomtree.html', function() {

            $('#randomtreeform').submit(function(event) {
                event.preventDefault();
                //debug(booom(root));
                //var params = $("#randomtreeform input[name=randomTreeBranchingFactor]").val();
                //debug(parseIntparams);
                var tree = randomTree(
                    parseInt($("#randomtreeform input[name=randomTreeBranchingFactor]").val()),
                    parseInt($("#randomtreeform input[name=randomTreeMaxDepth]").val()),
                    $("#randomtreeform input[name=randomTreeCompleteFlag]").is(':checked'),
                    $("#randomtreeform input[name=randomTreeLeafFlag]").is(':checked')
                );
                $('#treecontainer').empty();
                mIA.newTree(tree);
                mIA.draw('treecontainer');
                navigateTo('#homepage');
            });

		
		});
		
	});
	
