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
		
		$('#benchmark').load('templates/benchmark.html', function() {
		    $('#benchmarkform').submit(function(event) {
                        event.preventDefault();
                        var ntest = parseInt($("#benchmarkTestCount").val());
                        initCharts(ntest);
			
                        for (var i = 0; i < ntest; i++) {
                        	Benchmarker(
                        		randomTree(
                        			parseInt($("#benchmarkBranching").val()),
                    				parseInt($("#benchmarkTreeDepth").val()),
                    				true,
                    				true
                    			), cback
                    		);
                    	}
                    	var overalltime = [];
			var counter = 0;
			var variance = [0,0,0,0,0,0];
			var totale = [0,0,0,0,0,0];
			var mean = [0,0,0,0,0,0];
			var mean_old = [0,0,0,0,0,0];
			var variance_old =  [0,0,0,0,0,0];
			//Dfs, Bfs, Ucs, Ids, Greedy, AStar
			function cback(data) {
				counter++;
				
				var data_array = {
				  0: data.Dfs.data.tw,
				  1: data.Bfs.data.tw,
				  2: data.Ucs.data.tw,
				  3: data.Ids.data.tw,
				  4: data.Greedy.data.tw,
				  5: data.AStar.data.tw,
				};
				
				
				var variancechart = $('#variancechart').highcharts();
				//console.log(variancechart.series[0].data[0]);
				
				$(totale).each(function(i, e){
				  totale[i] += data_array[i];
				});
				
				//mean_old = mean;
				$(mean).each(function(i, e){
				  mean_old[i] = e;
				  mean[i] = totale[i]/counter;
				});
				
				$(variance).each(function(i, e){
				  variance_old[i] = e;
				  variance[i] = variance_old[i] + (data_array[i] - mean[i]) * (data_array[i] - mean_old[i]);
				});
				
				$(variancechart.series[0].data).each(function(i, e){
				  this.update(this.y + variance[i]);
				});
				
				var timechart = $('#timechart').highcharts();
				timechart.series[0].addPoint(data.Dfs.data.tw, false);
				timechart.series[1].addPoint(data.Bfs.data.tw, false);
				timechart.series[2].addPoint(data.Ucs.data.tw, false);
				timechart.series[3].addPoint(data.Ids.data.tw, false);
				timechart.series[4].addPoint(data.Greedy.data.tw, false);
				timechart.series[5].addPoint(data.AStar.data.tw, true);
				
				
				
				var pointschart = $('#pointschart').highcharts();
				var par = pointschart.series[0].yData;
				var results = [
					['Dfs', data.Dfs.data.tw],
					['Bfs', data.Bfs.data.tw],
					['Ucs', data.Ucs.data.tw],
					['Ids', data.Ids.data.tw],
					['Greedy', data.Greedy.data.tw],
					['AStar', data.AStar.data.tw],
				];
				results.sort(function(a, b) {return a[1] - b[1]});
				var res2 = {};
				for (var i = 0; i < 6; i++) {
					res2[results[i][0]] = i;
				}
				par[0]+=(6 - res2['Dfs']);
				par[1]+=(6 - res2['Bfs']);
				par[2]+=(6 - res2['Ucs']);
				par[3]+=(6 - res2['Ids']);
				par[4]+=(6 - res2['Greedy']);
				par[5]+=(6 - res2['AStar']);
				pointschart.series[0].setData(par);			
				
			}
			
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
	
