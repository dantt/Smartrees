/*

This is no longer a web worker, still lots of magic will be used here

*/






function Benchmarker(tree, callback){
    //questo chiama settree
    //settree mette la radice in frontiera
    //this._problem = new Problem(tree);
		
	function doWork(strategy, callback) {
		var t0 = performance.now();
		var worker = new Worker('my_worker.js');
		worker.onmessage = function(e) {
			var t1 = performance.now();
			callback(null, {'data': e.data, 'time': t1-t0});
		};
		worker.postMessage({'tree': tree, 's': strategy});
	}	
	
	async.parallel({
			Dfs: function(callback) {
				doWork("Dfs", callback);
			},
			Bfs: function(callback) {
				doWork("Bfs", callback);
			},
			Ucs: function(callback) {
				doWork("Ucs", callback);
			},
			Ids: function(callback) {
				doWork("Ids", callback);
			},
			Greedy: function(callback) {
				doWork("Greedy", callback);
			},
			AStar: function(callback) {
				doWork("AStar", callback);
			},
		},
		function(err, results) {
			callback(results);
		}
	);
	
	
	
	
	
	
	
	
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

