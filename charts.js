function initCharts(NoT) {

var categoryArray = [];

for (var i = 0; i < NoT; i++) {
	categoryArray.push('Test ' + i);
}


//Time chart

	$(function () {
		$('#timechart').highcharts({	    
		    chart: {
		        type: 'column',
            		zoomType: 'y'
		    },	    
		    title: {
		        text: 'Exec time - the lower the better'
		    },	    
		    xAxis: {
		        categories: categoryArray
		    },	    
		    yAxis: {
		        min: 0,
		        title: {
		            text: 'Time'
		        }
		    },	    
		    /*tooltip: {
		        formatter: function() {
		            return '<b>'+ this.x +'</b><br/>'+
		                this.series.name +': '+ this.y +'<br/>'+
		                'Total: '+ this.point.stackTotal;
		        }
		    },	    */
		    plotOptions: {
		        column: {
		            //stacking: 'normal'
		        }
		    },	    
		    series: [
		    	{
				name: 'Dfs',
				data: []
			},
			{
				name: 'Bfs',
				data: []
			},
			{
				name: 'Ucs',
				data: []
			},
			{
				name: 'Ids',
				data: []
			},
			{
				name: 'Greedy',
				data: []
			},
			{
				name: 'A*',
				data: []
			},		    
		    ]
		});
	    });
	    
	    
	    $(function () {
		$('#pointschart').highcharts({	    
		    chart: {
		        type: 'column',
		    },	    
		    title: {
		        text: 'Overall score - The higher the better'
		    },	    
		    xAxis: {
		        categories:  [
		    	'Dfs',
			'Bfs',
			'Ucs',
			'Ids',
			'Greedy',
			'A*',		    
		    ]
		    },	    
		    yAxis: {
		        min: 0,
		        title: {
		            text: 'Points'
		        }
		    },	    
		    /*tooltip: {
		        formatter: function() {
		            return '<b>'+ this.x +'</b><br/>'+
		                this.series.name +': '+ this.y +'<br/>'+
		                'Total: '+ this.point.stackTotal;
		        }
		    },	    */
		    plotOptions: {
		        column: {
		            //stacking: 'normal'
		        }
		    },	    
		    series: [
		    	{
				name: 'Score',
				data: [0, 0, 0, 0, 0, 0]
			},    
		    ]
		});
	    });
	    
	    
	    
}
