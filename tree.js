/***** Legacy code *******/
	 margin = {top: 50, right: 120, bottom: 20, left: 120},
	 width = 960 - margin.right - margin.left,
	 height = 500 - margin.top - margin.bottom;
	 
	 
/**********************************/
/**********************************/
/*** Costruttore di TreeManager ***/
/**********************************/
/**********************************/

function TreeManager(json) {
	//Non credo serva .size ma ho paura di rompere qualcosa
	//In realtà serve ma si può tweakare
	this._tree = d3.layout.tree()
	 .size([height, width]);
	 
	//Questa non è una buona idea 
	this._json = json;
}


/*********************************/
/*********************************/
/*** Campi dati di TreeManager ***/
/*********************************/
/*********************************/

/*** Un albero ha i riferimenti ad albero di d3.js, e al rendering in svg ***/
TreeManager.prototype._json = '';
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
	 .attr("width", "100%")
	 .attr("viewBox", "0 0 500 500")
	 .attr("preserveAspectRatio", "xMinYMin meet")
	 .attr("class", "svg-content")
	 .attr("transform", "translate(0, 50)")
	  .append("g");
	  
	this.update(this._json);
};

/*** Metodo Update ***/
TreeManager.prototype.update = function(source) {

	var root = source[0];
	var _svg = this._svg;
	var i = 0;
	var i2 = 0;
	var i3 = 0;
	var nodes = this._tree.nodes(root).reverse();
	this._nodes = this._tree.nodes(root);
	var links = this._tree.links(nodes);

	//Chiamata da tweakare per sistemare l'altezza dei nodi
	//Si può rendere parametrico a seconda di quanti nodi ci sono
	nodes.forEach(function(d) { d.y = d.depth * 80; });
	
	
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
			 .attr("dx", function() { if (d.source.x > d.target.x) return -10; else return 3; })
			 .text(d.target.cost);
	 
			return "p" + d.target.name; 
		})
	 .attr("d", function(d) { return "M " + d.source.x + "," + d.source.y + " L " + d.target.x + "," + d.target.y; });

	 
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
	 
	var count = this._svg.selectAll("g.node").filter(function(d) { return d.selected; })[0].length;
	node.select('circle')
	 .filter( function(d) {return d.selected == count; } )
	 .transition()
	 .style("fill", treeConfig.nodeSelectedFillColor)
	 .duration(1000);
	 
};


/*** Metodo NodeSelected ***/
//OBSOLETE
TreeManager.prototype.selected = function(selector) {

	var node = d3.select(selector).node();
    var clone = d3.select(node.parentNode.insertBefore(node.cloneNode(true),node.nextSibling));
	
	d3.select(selector).transition()
	 .style("fill", treeConfig.nodeSelectedFillColor)
	 .each(function(d) { d.selected = 1; })
	 .duration(1000);
	 
	clone.transition().attr('r', 20).style('opacity', 0).duration(1000).remove();
	var count = this._svg.selectAll("g.node").filter(function(d) { return d.selected == 1; })[0].length;
	
	d3.select(selector + "~ text").transition()
	 .each("end", function(d) { d3.select(this).text( "#" + d.name + "/" + count); })
	 .style("font-size", "7px")
	 .duration(1000);
};

/*** Metodo NodeDeselected ***/
//OBSOLETE
TreeManager.prototype.deselected = function(selector) {
	d3.select(selector).transition().style("fill", "#FFF").duration(1000);
	d3.select(selector + "~ text").transition()
	 .each(function(d) { d3.select(this).text( "#" + d.name); })
	 .style("font-size", "10px")
	 .duration(1000);
};


/******************/
/******************/
/***** Init *******/
/******************/
/******************/

//Moved to client code