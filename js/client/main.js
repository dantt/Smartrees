mIA = new IA(treePresets.preset2);


//DOM INIT CODE 
$(document).ready(function () {

    // Event Listeners
    document.addEventListener('updated', mIA.update.bind(mIA), false);


    //Navigation how-to: on first pageload load every template you'll need in a div inside #maincontainer
    //It will be hidden by default (mark it active otherwise). Give it an ID    
    $('#sidemenu a').click(function (event) {
        event.preventDefault();
        navigateTo(this.hash);
    });
    $('#index a').click(function (event) {
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

    $('#homepage').load('templates/homepage.html', function () {

        mIA.draw('treecontainer');

        $("#step").click(function () {
            mIA.step();
        });
        $("#play").click(function () {
            mIA.play();
        });
        $("#stop").click(function () {
            mIA.stop();
        });
        $("#restart").click(function () {
            mIA.reset();
        });

        $('#algo').change(function () {
            var selected = $('#algo option:selected').val();
            mIA.setStrategy(selected);
        });
        $('#order').change(function () {
            var selected = $('#order option:selected').val();
            mIA.setOrder(selected);
        });
        document.addEventListener('emptyfringe', function () {
            $('#output').html('<p class="warning">Empty frontier! Search failed</p>');
            mIA.stop();
        }, false);

        document.addEventListener('goalfound', function (e) {
            $('#output').html('<p class="success">Goal found in node ' + e.detail.target + '</p>');
            $('#output').append('<p class="success">Path to goal was: ' + e.detail.path + '</p>');
            mIA.stop();
        }, false);

        document.addEventListener('limitincremented', function (e) {
            $('#output').html('<p class="">Limit now set to ' + e.detail.limit + '</p>');
        }, false);

    });

    $('#loadtree').load('templates/loadtree.html', function () {
        $('#formtree').submit(function (event) {
            event.preventDefault();
            //@WARNING: VALIDALO VALIDALO VALIDALO
            console.log($('#treepaster').val().replace("\\t", '').replace("\\n", ''));
            //much error safeness wow
            try {
                var to_string;
                to_string = JSON.parse($('#treepaster').val().replace("\\t", '').replace("\\n", ''));
                mIA.newTree(to_string);
		$('#treecontainer').html('');
                mIA.draw('treecontainer');
                navigateTo('#homepage');
            } catch (err) {
                var alertBox = $('<div id="myId" data-alert class="alert-box alert round alertClose"> The Json is not valid <a id="alertCloseLink" href="#" class="close">&times;</a></div>');
                $('#loadTreeContainer').append(alertBox);
                // qua in genere la proprieta' 'data-alert' del div dovrebbe provvedere alla chiusura ma inizializzandola
                // con jquery stampa 'data-alert=""' e non funziona perche sembra un attributo
                $("#alertCloseLink").bind("click", function () {
                    $('.alertClose').remove();
                })

            }

        });
    });

    $('#presets').load('templates/presets.html', function () {

        $('#preset1').click(function () {
            $('#treecontainer').empty();
            mIA.newTree(treePresets.preset1);
            mIA.draw('treecontainer');
            navigateTo('#homepage');
        });

        $('#preset2').click(function () {
            $('#treecontainer').empty();
            mIA.newTree(treePresets.preset2);
            mIA.draw('treecontainer');
            navigateTo('#homepage');
        });

        $('#preset3').click(function () {
            $('#treecontainer').empty();
            mIA.newTree(treePresets.preset3);
            mIA.draw('treecontainer');
            navigateTo('#homepage');
        });

        $('#preset4').click(function () {
            $('#treecontainer').empty();
            mIA.newTree(treePresets.preset4);
            mIA.draw('treecontainer');
            navigateTo('#homepage');
        });

    });

    $('#settings').load('templates/settings.html', function () {

        $('#optionsform input[type = "text"]').each(function () {
            $(this).val(mIA.settings.getOption($(this).attr('name')));
        });

        $('#optionsform').submit(function (event) {
            event.preventDefault();
            mIA.setOptions($('form').serialize());
            navigateTo('#homepage');
        });

    });


    $('#benchmark').load('templates/benchmark.html', function () {

        /* var s = $("#sticker");
         var pos = s.position();
         $('.off-canvas-wrap').scroll(function() {
         var windowpos = $('.off-canvas-wrap').scrollTop();
         console.log(windowpos, pos.top);
         if (windowpos - 100 >= pos.top) {
         s.addClass("stick");
         } else {
         s.removeClass("stick");
         }
         }); */

        $('#benchmarkform').submit(function (event) {
            event.preventDefault();
            var ntest = parseInt($("#benchmarkTestCount").val());
            initCharts(ntest);

            //The total number of nodes in a perfect k-ary tree is (k^{h+1} - 1)/(k-1)
            //Ok l'idea è creo un array di tasks da passare a series e poi lo invoco
            var array_da_passare_a_series = [];
            for (var i = 0; i < ntest; i++) {
                array_da_passare_a_series.push(
                    function(callback){
                        k = parseInt($("#benchmarkBranching").val());
                        h = parseInt($("#benchmarkTreeDepth").val());
                        Benchmarker(
                            randomTree(
                                k,
                                h,
                                $("#benchmarkCompleteFlag").is(':checked'),
                                $("#benchmarkLeafFlag").is(':checked')
                            ),
                                (Math.pow(k, h+1) - 1)/(k - 1),
                            cback
                        );
                        document.addEventListener('nextone', function (e) {
                            callback(null, i);
                        }, false);
                    }
                );
            }
            async.series(array_da_passare_a_series);
            /*
             for (var i = 0; i < ntest; i++) {
             k = parseInt($("#benchmarkBranching").val());
             h = parseInt($("#benchmarkTreeDepth").val());
             Benchmarker(
             randomTree(
             k,
             h,
             $("#benchmarkCompleteFlag").is(':checked'),
             $("#benchmarkLeafFlag").is(':checked')
             ),
             (Math.pow(k, h+1) - 1)/(k - 1),
             cback
             );
             }*/

            if (!$("#resultExecTime").is(':checked')){
                $("#timechart").remove();
            }
            if (!$("#resultScore").is(':checked')){
                $("#pointschart").remove();
            }
            if (!$("#resultSuccesses").is(':checked')){
                $("#successchart").remove();
            }
            if (!$("#resultVariance").is(':checked')){
                $("#variancechart").remove();
            }

            var counter = 0;
            var variance = [0, 0, 0, 0, 0, 0];
            var totale = [0, 0, 0, 0, 0, 0];
            var mean = [0, 0, 0, 0, 0, 0];
            var mean_old = [0, 0, 0, 0, 0, 0];
            var variance_old = [0, 0, 0, 0, 0, 0];
            var M2 = [0, 0, 0, 0, 0, 0];
            //Dfs, Bfs, Ucs, Ids, Greedy, AStar
            var name_to_index = {
                0: 'Dfs',
                1: 'Bfs',
                2: 'Ucs',
                3: 'Ids',
                4: 'Greedy',
                5: 'AStar'
            };

            function cback(data) {
                document.dispatchEvent(new Event('nextone'));

                counter++;
                $('#completionMeter').css('width', (counter / ntest) * 100 + "%");
                $('#completionMeter').html(parseInt((counter / ntest) * 100) + "%");
                //$('#completionMeter').html((counter/ntest)*100 + "%");
                console.log(data);
                var data_array = {
                    0: data.Dfs.data.tw,
                    1: data.Bfs.data.tw,
                    2: data.Ucs.data.tw,
                    3: data.Ids.data.tw,
                    4: data.Greedy.data.tw,
                    5: data.AStar.data.tw,
                };

                var data_array2 = [
                    data.Dfs.data,
                    data.Bfs.data,
                    data.Ucs.data,
                    data.Ids.data,
                    data.Greedy.data,
                    data.AStar.data,
                ];


                var optimal_node_id = data.Ucs.data.res.name;
                if ($("#resultSuccesses").is(':checked')) {
                    var successchart = $('#successchart').highcharts();
                    //console.log ("the optimal node is " + optimal_node_id);
                    //console.log ("they found");

                    $(data_array2).each(function (i, e) {
                        //console.log(name_to_index[i] + " " + e.res.name);
                        if (e.res.name == optimal_node_id) {
                            successchart.series[0].data[i].update(successchart.series[0].data[i].y + 1);
                        } else {
                            successchart.series[1].data[i].update(successchart.series[1].data[i].y + 1);
                        }
                    })
                }

                if ($("#resultVariance").is(':checked')) {
                    var variancechart = $('#variancechart').highcharts();
                    //console.log(variancechart.series[0].data[0]);

                    $(totale).each(function (i, e) {
                        totale[i] += data_array[i];
                    });

                    $(mean).each(function (i, e) {
                        mean_old[i] = e;
                        mean[i] = totale[i] / counter;
                    });

                    $(variance).each(function (i, e) {
                        //console.log(e);
                        variance_old[i] = e;

                        var delta = data_array[i] - mean_old[i];
                        M2[i] += delta * (data_array[i] - mean[i]);
                        variance[i] = M2[i] / (counter);
                        //console.log("media: " + mean[i] + "  old: " + mean_old[i] + "  item: " + data_array[i]);
                    });

                    //Variance chart updating
                    $(variancechart.series[0].data).each(function (i, e) {
                        //console.log(variance[i]);
                        this.update(variance[i]);
                    });
		    
		    
		    var meanchart = $('#meanchart').highcharts();
		    
		    $(meanchart.series[0].data).each(function (i, e) {
		      //console.log(variance[i]);
		      this.update(mean[i]);
		    });
		    
		    
                }
                //Time chart updating
                if ($("#resultExecTime").is(':checked')) {
                    var timechart = $('#timechart').highcharts();
                    var bool = (counter > 10) ? true : false;
                    $(timechart.series).each(function (i, e) {
                        this.addPoint(data_array[i], false, bool);
                    });
                    timechart.redraw();
                }
                //Score chart updating
                if ($("#resultScore").is(':checked')) {
                    var pointschart = $('#pointschart').highcharts();
                    var par = pointschart.series[0].yData;
                    var results = [];
                    for (var i = 0; i < 6; i++) {
                        results.push([name_to_index[i], data_array[i]]);
                    }
                    results.sort(function (a, b) {
                        return a[1] - b[1]
                    });
                    var res2 = {};
                    for (var i = 0; i < 6; i++) {
                        res2[results[i][0]] = i;
                    }
                    for (var i = 0; i < 6; i++) {
                        par[i] += (6 - res2[name_to_index[i]]);
                    }

                    pointschart.series[0].setData(par);
                }

            }

        });
    });


    $('#randomtree').load('templates/randomtree.html', function () {

        $('#randomtreeform').submit(function (event) {
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