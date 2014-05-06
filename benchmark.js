


function Benchmarker(tree, strategy){
    //questo chiama settree
    //settree mette la radice in frontiera
    console.time('init');
    this._problem = new Problem(tree);
    console.timeEnd('init');
    
    console.time('execution');
    this._problem.strategy = strategy;
    var result = false;
    //finche non ho trovato il risultato e finche il result ritorna un valore diverso da 0 (frontiera vuota)
    while (!(typeof result === 'object' && result.target == 1) && result !== 0){
        result = this._problem.step();
    }
    console.timeEnd('execution');
    console.log(result);
};

