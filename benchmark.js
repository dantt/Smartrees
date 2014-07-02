/*

 This is no longer a web worker, still lots of magic will be used here

 */






function Benchmarker(tree, nodesCount, cb){
    //questo chiama settree
    //settree mette la radice in frontiera
    //this._problem = new Problem(tree);

    function doWork(strategy, bbb) {
        var t0 = performance.now();
        var worker = new Worker('my_worker.js');
        worker.onmessage = function(e) {
            var t1 = performance.now();
            bbb(null, {'data': e.data, 'time': t1-t0});

        };
        worker.postMessage({'tree': tree, 's': strategy});
    }
    if (nodesCount >= Math.pow(6,6) && 0==1){ //this was just a test now we just go for parallel, eventually we can use this in the future
        async.series({
                Dfs: function (callback) {
                    doWork("Dfs", callback);
                },
                Bfs: function (callback) {
                    doWork("Bfs", callback);
                },
                Ucs: function (callback) {
                    doWork("Ucs", callback);
                },
                Ids: function (callback) {
                    doWork("Ids", callback);
                },
                Greedy: function (callback) {
                    doWork("Greedy", callback);
                },
                AStar: function (callback) {
                    doWork("AStar", callback);
                },
            },
            function(err, results) {
                cb(results);
            });
    }
    else {
        async.parallel({
                Dfs: function (callback) {
                    doWork("Dfs", callback);
                },
                Bfs: function (callback) {
                    doWork("Bfs", callback);
                },
                Ucs: function (callback) {
                    doWork("Ucs", callback);
                },
                Ids: function (callback) {
                    doWork("Ids", callback);
                },
                Greedy: function (callback) {
                    doWork("Greedy", callback);
                },
                AStar: function (callback) {
                    doWork("AStar", callback);
                },
            },
            function (err, results) {
                cb(results);
            });
    }








    /*
     var t0 = performance.now();
     this._problem.strategy = strategy;
     var result = false;
     //finche non ho trovato il risultato e finche il result ritorna un valore diverso da 0 (frontiera vuota)
     while (!(typeof result === 'object' && result.target == 1) && result !== 0){
     result = this._problem.step();
     }
     var t1 = performance.now();
     console.log(result);

     return t1 - t0;*/

};

