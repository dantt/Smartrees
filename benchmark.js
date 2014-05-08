/*

This is no longer a web worker, still lots of magic will be used here

*/



function Benchmarker(tree){
    //questo chiama settree
    //settree mette la radice in frontiera
    //this._problem = new Problem(tree);
	
	
	
	
	async.parallel({
			dfs: function(callback) {
				console.log(1);
				var worker = new Worker('my_worker.js');
				worker.onmessage = function(e) {
					callback(null, e.data);
				};
				worker.postMessage({'tree': tree, 's': "Dfs"});
			},
			bfs: function(callback) {
				console.log(2);
				var worker = new Worker('my_worker.js');
				worker.postMessage({'tree': tree, 's': "Bfs"});
				worker.onmessage = function(e) {
					callback(null, e.data);
				};
			}
		},
		function(err, results) {
			console.log(results);
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

