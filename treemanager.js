/***** Legacy code *******/
	 margin = {top: 50, right: 120, bottom: 20, left: 120},
	 width = '100%',
	 height = 500 - margin.top - margin.bottom;
	 
	 
/**********************************/
/**********************************/
/*** Costruttore di TreeManager ***/
/**********************************/
/**********************************/

function TreeManager(getTree) {
	//Non credo serva .size ma ho paura di rompere qualcosa
	//In realtà serve ma si può tweakare
	this._tree = d3.layout.tree()
	 .size([300, 300]);
	 
	//Questa non è una buona idea 
	this._getTree = getTree;
}


/*********************************/
/*********************************/
/*** Campi dati di TreeManager ***/
/*********************************/
/*********************************/

/*** Un albero ha i riferimenti ad albero di d3.js, e al rendering in svg ***/
TreeManager.prototype._getTree = '';
TreeManager.prototype._tree = '';
TreeManager.prototype._nodes = '';
TreeManager.prototype._svg = '';



/*****************************/
/*****************************/
/*** Metodi di TreeManager ***/
/*****************************/
/*****************************/

/*** Metodo Draw, probabilmente esposto ***/
TreeManager.prototype.draw = function(container) {

	//IFF il metodo draw si espone all'esterno,
	//dovremmo controllare il JSON prima di usarlo
	//Altrimenti si delega al chiamante
	this._svg = d3.select("#" + container).append("svg")
	 //.attr("style", "width:100%;height:100%")
	 .attr("viewBox", "0 0 300 300")
	 .attr("preserveAspectRatio", "xMinYMin meet")
	 .attr("class", "svg-content")
	 .attr("transform", "translate(0, 50)")
	  .append("g");
	  
	this.update();
};

/*** Metodo Update ***/
TreeManager.prototype.update = function() {
	
	var source = this._getTree();
	var root = source[0];
	var _svg = this._svg;
	var nodes = this._tree.nodes(root).reverse();
	this._nodes = this._tree.nodes(root);
	var links = this._tree.links(nodes);

	//Chiamata da tweakare per sistemare l'altezza dei nodi
	//Si può rendere parametrico a seconda di quanti nodi ci sono
	var list = Array();
	nodes.forEach(function(d) { list.push(d.depth); }, list);
	var y = d3.scale.linear()
   	 .domain([0, d3.max(list)+1])
    	 .range([0, 500]);
	nodes.forEach(function(d) { d.y = y(d.depth)/2; });
	
	
	//
	//	PIMP MY LINKS
	//
	
	// 1 - Data join
	var link = this._svg.selectAll(".link")
	 .data(links);	 
	 
	// 2 - Enter Selection
	var linkenter = link.enter().append("path")
	 .attr("class", "link")
	 .attr("id", 
		function(d) { 
			//Disegna le etichette sugli archi
			//Sono sicuro si potrebbe spostare, qui fa schifo (dovrebbe avere un suo append)
			//Ma INTANTO funziona
			_svg.append("text")
			 .attr("class", "labels")
			 .attr("x", d.source.x/2 + d.target.x/2)
			 .attr("y", d.source.y/2 + d.target.y/2)
			 .attr("dx", function() { if (d.source.x > d.target.x) return -20; else return 3; })
			 .style("font-size", "5px")
			 .text("c:" + d.target.cost + "|h:" + d.target.h);
	 
			return "p" + d.target.name; 
		})
	 .attr("d", function(d) { return "M " + d.source.x + "," + d.source.y + " L " + d.target.x + "," + d.target.y; });
	 
	// 3 - Exit selection
	
	link.exit().remove();

	 
	//
	//	PIMP MY NODES
	//
	
	// 1 - Data join
	var node = this._svg.selectAll("g.node")
	 .data(nodes, function(d) { return d.name; });
	
	// 2 - Enter Selection
	var nodeEnter = node.enter().append("g")
	 .attr("class", function (d) { return (d.target != 1 ) ? "node" : "node target"; })
	 .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")";});

	nodeEnter.append("circle")
	 .attr("id", function(d) { return "circle" + d.name; })
	 .attr("r", 10)
	 .style("fill", "#fff");
	 
	nodeEnter.append("circle")
	 .filter( function(d) { return d.target === 1; })
	 .attr("r", 8)
	 .style("fill", "#fff");

	nodeEnter.append("text")
	 .attr("class", "nodetext")
	 .attr("dy", "3")
	 .attr("text-anchor", "middle")
	 .text(function(d) { return "#" + d.name; })
	 .style("fill-opacity", 1)
	 .style("font-size", "0.6em");
	 
	// 2 - Update Selection
	node.append("line")
	 .filter( function(d) { return d.pruned === 1; })
	 .attr("stroke", "red")
     .attr("stroke-width", "1")
	 .attr("stroke-dasharray","0, 28.28")
	 .attr("x1", -10)
	 .attr("y1", -10)
	 .attr("x2", 10)
	 .attr("y2", 10)
	 .transition()
	 .attr("stroke-dasharray","28.28, 28.28")
	 .duration(1000);
	 
	var max = 0;
	this._svg.selectAll("g.node").each(function(d) { max = (typeof d.selected !== 'undefined' && d.selected > max) ? d.selected : max; return; });
	console.log(max);
	var scope = this;
	node.select('circle')
	 .filter( function(d) {return d.selected == max; } )
	 .each( function(d, i) { scope.selected(this); })
	 .transition()
	 .style("fill", iaSettings.getOption('nodeSelectedFillColor'))
	 .duration(1000);
	 
	node.select('circle')
	 .filter( function(d) {return (typeof d.selected === 'undefined'); } )
	 .transition()
	 .style("fill", '#FFF')
	 .duration(1000);
	 
	var nodetext = node.select("text.nodetext")
	 .filter( function(d) {return d.selected == max; } )
	 .transition()
	 .each("end", function(d) { d3.select(this).text( "#" + d.name + "/" + d.selected); })
	 .style("font-size", "5px")
	 .duration(1000);
	 
	var nodetext2 = node.select("text.nodetext")
	 .filter( function(d) { return (typeof d.selected === 'undefined'); } )
	 .transition()
	 .each("start", function(d) { d3.select(this).text( "#" + d.name); })
	 .style("font-size", "10px")
	 .duration(1000);
	

	// 3 - Exit selection
	
	node.exit().remove();
	
	 
};



/*** Metodo NodeSelected ***/
//OBSOLETE
//A PARTE LA PARTE "CLONA IL NODO", VA SPOSTATA IN UPDATE
//MA PER ORA FUNZIONA CHIAMANDOLO
TreeManager.prototype.selected = function(selector) {

	var node = d3.select(selector).node();
    	var clone = d3.select(node.parentNode.insertBefore(node.cloneNode(true),node.nextSibling));
	 
	clone.transition().attr('r', 20).style('opacity', 0).duration(1000).remove();
	var count = this._svg.selectAll("g.node").filter(function(d) { return d.selected == 1; })[0].length;
};


/******************/
/******************/
/***** Init *******/
/******************/
/******************/

//Moved to client code
