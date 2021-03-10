var apimock = (function () {

    var mockdata = [];

    mockdata["JhonConnor"] = [
        {
            author: "JhonConnor",
            name: "house",
            points: [
                {
                    x: 10,
                    y: 20
                },
                {
                    x: 15,
                    y: 25
                },
                {
                    x: 45,
                    y: 25
                }
            ]
        },
        {
            author: "JhonConnor",
            name: "bike",
            points: [
                {
                    x: 30,
                    y: 35
                },
                {
                    x: 40,
                    y: 45
                }
            ]
        }
    ]
    mockdata['Jose'] = [
	      {
	          author: 'Jose',
	          name: 'subway',
	          points: [
	              {
	                  x: 5,
	                  y: 10
	              },
	              {
	                  x: 30,
	                  y: 35
	              }
	          ]
	      },
		  {
	          author: 'Jose',
	          name: 'another',
	          points: [
	              {
	                  x: 55,
	                  y: 10
	              },
	              {
	                  x: 37,
	                  y: 25
	              }
	          ]
	      }
	  ]
	
	mockdata['Daniel'] = [
	      {
	          author: 'Daniel',
	          name: 'building',
	          points: [
	              {
	                  x: 5,
	                  y: 10
	              },
	              {
	                  x: 30,
	                  y: 35
	              },
	              {
	                  x: 40,
	                  y: 20
	              }
	          ]
	      },
		  {
	          author: 'Daniel',
	          name: 'anotherBuilding',
	          points: [
	              {
	                  x: 5,
	                  y: 10
	              }
	          ]
	      }
	  ]

    return {
        getBlueprintsByAuthor: function(author, callback) {
            callback(mockdata[author]);
        },

        getBlueprintsByNameAndAuthor: function(name, author, callback) {
            blueprint = mockdata[author].find(function(blueprint) {
                return blueprint.name == name
            });
            callback(blueprint)
        }
    }

})();