

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


/**
 *
 * @param branching
 * @param branching_fixed
 * @param depthLimit
 * @param depthLimitFixed
 * @returns {{name: number, depth: number, cost: *, h: number}[]}
 */
function randomTree(branching, branchingFixed, depth_limit, depthLimitFixed){
    branchingFixed = false;
    depthLimitFixed = false;
    branching = (typeof branching === 'undefined' || isNaN(branching))? getRandomInt(2,4): branching;
    depth_limit = (typeof depth_limit === 'undefined' || isNaN(depth_limit))? getRandomInt(1,8): depth_limit;
    var node_limit_wrapper = new Object({
        node_counter: "0"
    });
    /*debug("br " + branching);
    debug("dl " + depth_limit);
    debug("nl " + nodes_limit);*/
    var alphabet = new Object({
        letters: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    });
    //debug(nodes_limit);
    //var last_node_name = alphabet.letters.unshift();
    var root = [{
        name: node_limit_wrapper.node_counter++,
        depth: 0,
        cost: getRandomInt(1,10),
        h: 1*getRandomInt(1,50)
    }];
    //debug(nodes_limit);
    //var num_childrens = getRandomInt(0, branching);
    //debug
    root[0].children = generateChildrens(
        root[0],
        branching,
        depth_limit,
        node_limit_wrapper
    );
    //debug(root.children.length);
    return root;
}

function generateChildrens(node, branching, depth_limit, nodes_limit){
    var num_childrens = getRandomInt(0, branching);
    //odes_limit -= num_childrens;
    /*debug("num child: " + num_childrens);
    debug(node.depth);
    debug(depth_limit);
    debug(nodes_limit.left_count);
    debug(num_childrens);*/
    if (num_childrens == 1){
        num_childrens++; //atleaast 2
    }
    if (node.depth < depth_limit && num_childrens > 0){
        var childrens = [];
        for (var i = 0; i < num_childrens; i++){
            childrens.push(new Object({
                name: String(nodes_limit.node_counter++),
                depth: node.depth+1,
                cost: getRandomInt(1,10),
                h: 1/(node.depth+1)*getRandomInt(1,50) //decreases with depth
            }));
            childrens[i].children = generateChildrens(childrens[i], branching, depth_limit, nodes_limit);
        }
        return childrens;
    }
    else{
        return [];
    }
}

/*
 function booom(root){
 seen = [];
 return JSON.stringify(root, function(key, val) {
 if (typeof val == "object") {
 if (seen.indexOf(val) >= 0)
 return;
 seen.push(val);
 }
 return val;
 });
 }


 */
















