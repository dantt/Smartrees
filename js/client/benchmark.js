/**
 * Runs a single benchmarking test on a tree
 * @param tree -- reference to the tree
 * @param nodesCount -- number of nodes in the tree
 * @param cb -- callback function
 * @constructor
 */
function Benchmarker(tree, nodesCount, cb){

    /**
     * Spawns a Web worker and send him some work to do on a tree following a particular strategy
     * @param strategy -- reference to the function implementing the search
     * @param bbb -- callback function
     */
    function doWork(strategy, bbb) {
        var t0 = performance.now();
        var worker = new Worker('js/client/my_worker.js');
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

