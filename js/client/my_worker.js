importScripts('alg.js');
importScripts('config.js');
importScripts('problem.js');


self.onmessage = function(e) {

	var data = e.data;
	var c = (data.s == 'Ids') ? true : false;
	var t2 = Date.now();
	var problem = new Problem(data.tree, c);
	problem.strategy = algoMap[data.s];
  	var t0 = Date.now();
	var result = false;
	//finche non ho trovato il risultato e finche il result ritorna un valore diverso da 0 (frontiera vuota)
	while (!(typeof result === 'object' && result.target == 1) && result !== 0){
		result = problem.step();
	}
  	var t1 = Date.now();
  	var time = t1 - t0;
  	var time2 = t1 - t2;
	self.postMessage({res: result, tw: time, twe: time2});
  
};
