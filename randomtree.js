

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function randomTree(branching, depth_limit, nodes_limit){
    branching = (typeof branching === 'undefined' || isNaN(branching))? getRandomInt(2,4): branching;
    depth_limit = (typeof depth_limit === 'undefined' || isNaN(depth_limit))? getRandomInt(1,8): depth_limit;
    nodes_limit = (typeof nodes_limit === 'undefined' || isNaN(nodes_limit))? getRandomInt(1,26): nodes_limit;
    var node_limit_wrapper = new Object({
        left_count: nodes_limit,
        node_counter: "0"
    });
    /*debug("br " + branching);
    debug("dl " + depth_limit);
    debug("nl " + nodes_limit);*/
    var alphabet = new Object({
        letters: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    });
    //debug(nodes_limit);
    //var last_node_name = alphabet.letters.unshift();
    var root = [{
        name: node_limit_wrapper.node_counter++,
        depth: 0,
        cost: getRandomInt(1,10)
    }];
    //debug(nodes_limit);
    node_limit_wrapper.left_count--;
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
    if (node.depth < depth_limit && nodes_limit.left_count > 0 && num_childrens > 0){
        var childrens = [];
        for (var i = 0; i < num_childrens && nodes_limit.left_count > 0; i++){
            childrens.push(new Object({
                name: String(nodes_limit.node_counter++),
                depth: node.depth+1,
                cost: getRandomInt(1,10)
            }));
            nodes_limit.left_count--;
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
















