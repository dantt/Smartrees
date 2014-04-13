treePresets = {

	preset1: [
	  {
		"name": "A",
		"children": [
		  {
			"name": "B",
			"cost": 1,
			"children": [
			  {
				"name": "C",
				"cost": 2,
			  },
			  { 
				"name": "D",
				"target": 1,
				"cost": 3,
			  },
			]
		  },
		  {
			"name": "E",
			"cost": 5,
		  }
		]
	  }
	],
	
	preset2: [
	  {
		"name": "A",
		"children": [
		  {
			"name": "B",
			"cost": 1,
			"children": [
			  {
				"name": "C",
				"cost": 2,
			  },
			  { 
				"name": "D",
				"cost": 3,
				"children": [
			  {
				"name": "H",
				"cost": 4,
				"target": 1,
			  },
			  { 
				"name": "I",
				"cost": 1,
			  },
			]
			  },
			]
		  },
		  {
			"name": "E",
			"cost": 5,
			"children": [
			  {
				"name": "F",
				"cost": 3,
			  },
			  { 
				"name": "G",
				"target": 1,
				"cost": 2,
			  },
			]
		  }
		]
	  }
	],
	
}