importScripts('alg.js');
importScripts('config.js');
importScripts('problem.js');


self.onmessage = function(e) {

	var data = e.data;

	var problem = new Problem(data.tree, false);
	problem.strategy = algoMap[data.s];
  
	var result = false;
	//finche non ho trovato il risultato e finche il result ritorna un valore diverso da 0 (frontiera vuota)
	while (!(typeof result === 'object' && result.target == 1) && result !== 0){
		result = problem.step();
	}
  
	self.postMessage(result);
  
};