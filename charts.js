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
		    legend: {
                      align: 'right',
                      x: -70,
                      verticalAlign: 'top',
                      y: 20,
                      floating: true,
                      backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                      borderColor: '#CCC',
                      borderWidth: 1,
                      shadow: false
                    },
                    tooltip: {
                      formatter: function() {
                        return '<b>'+ this.x +'</b><br/>'+
                        this.series.name +': '+ this.y +' ms<br/>';
                      }
                    },
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
		    legend: {
                      align: 'right',
                      x: -70,
                      verticalAlign: 'top',
                      y: 20,
                      floating: true,
                      backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                      borderColor: '#CCC',
                      borderWidth: 1,
                      shadow: false
                    },
                    tooltip: {
                      formatter: function() {
                        return '<b>'+ this.x +'</b><br/>'+
                        this.series.name +': '+ this.y +'<br/>';
                      }
                    },
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
	    
	    $(function () {
		$('#variancechart').highcharts({	    
		    chart: {
		        type: 'column',
		    },	    
		    title: {
		        text: 'Variance Chart'
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
		        type: 'logarithmic',
		        title: {
		            text: 'milliseconds'
		        }
		    },	    
                    legend: {
                      align: 'right',
                      x: -70,
                      verticalAlign: 'top',
                      y: 20,
                      floating: true,
                      backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                      borderColor: '#CCC',
                      borderWidth: 1,
                      shadow: false
                    },
                    tooltip: {
                      formatter: function() {
                        return '<b>'+ this.x +'</b><br/>'+
                        this.series.name +': '+ Math.round(this.y*100)/100 +'<br/>';
                      }
                    },
		    plotOptions: {
		        column: {
		            //stacking: 'normal'
		        }
		    },	    
		    series: [
		    	{
				name: 'Variance',
				data: [0, 0, 0, 0, 0, 0]
			},    
	    ]
		});
	    });
	    
	    $(function () {
	      $('#meanchart').highcharts({	    
		chart: {
		  type: 'column',
		},	    
		title: {
		  text: 'Exec time Mean Chart'
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
		  type: 'logarithmic',
		  title: {
		    text: 'milliseconds'
		  }
		},	    
		legend: {
		  align: 'right',
		  x: -70,
		  verticalAlign: 'top',
		  y: 20,
		  floating: true,
		  backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
					     borderColor: '#CCC',
				      borderWidth: 1,
				      shadow: false
		},
		tooltip: {
		  formatter: function() {
		    return '<b>'+ this.x +'</b><br/>'+
		    this.series.name +': '+ Math.round(this.y*100)/100 +'<br/>';
		  }
		},
		plotOptions: {
		  column: {
		    //stacking: 'normal'
		  }
		},	    
		series: [
		{
		  name: 'Mean',
		  data: [0, 0, 0, 0, 0, 0]
		},    
		]
	      });
	    });
	    
	    
            $(function () {
              $('#successchart').highcharts({
                chart: {
                type: 'column'
              },
              title: {
                text: 'Success Chart'
              },
              xAxis: {
                categories: [
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
                    text: 'Number of tests'
                },
                stackLabels: {
                    enabled: true,
                    style: {
                      fontWeight: 'bold',
                      color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                    }
                }
              },
              legend: {
                align: 'right',
                x: -70,
                verticalAlign: 'top',
                y: 20,
                floating: true,
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                borderColor: '#CCC',
                borderWidth: 1,
                shadow: false
              },
              tooltip: {
                formatter: function() {
                    return '<b>'+ this.x +'</b><br/>'+
                        this.series.name +': '+ this.y +'<br/>'+
                        'Total: '+ this.point.stackTotal;
                }
              },
              plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true,
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                        style: {
                            textShadow: '0 0 3px black, 0 0 3px black'
                        }
                    }
                }
              },
              series: [{
                name: 'Optimal',
                data: [0, 0, 0, 0, 0, 0]
              }, {
                name: 'Non-optimal',
                data: [0, 0, 0, 0, 0, 0]
              }]
              });
            });
	    
	    
}
