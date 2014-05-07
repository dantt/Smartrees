/*

This is a web worker, so lots of magic will be used here

*/

onmessage = function (oEvent) {
  if (oEvent.data instanceof Object && oEvent.data.hasOwnProperty("bk4e1h0") && oEvent.data.hasOwnProperty("ktp3fm1")) {
    queryableFunctions[oEvent.data.bk4e1h0].apply(self, oEvent.data.ktp3fm1);
  } else {
    defaultQuery(oEvent.data);
  }
};




function Benchmarker(tree, strategy){
    //questo chiama settree
    //settree mette la radice in frontiera
    this._problem = new Problem(tree);
    
    var t0 = performance.now();
    this._problem.strategy = strategy;
    var result = false;
    //finche non ho trovato il risultato e finche il result ritorna un valore diverso da 0 (frontiera vuota)
    while (!(typeof result === 'object' && result.target == 1) && result !== 0){
        result = this._problem.step();
    }
    var t1 = performance.now();
    console.log(result);
    
    return t1 - t0;
    
};

