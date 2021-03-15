var mock = apiclient;
//var mock = apimock;

var app = (function(){
	var at = null;
	var currentBp = null;
	var offset = null;
	
	var mapeo = function(lista){
		return mapped = lista.map(function(blueprint){
			return {name:blueprint.name, pts:blueprint.points.length};
			
		})
	}
	var table = function(bps){
		
		if(bps === undefined){
			alert("Author does not exist");
		}else{
			bps = mapeo(bps);
			if(bps.length > 1){
				var r = bps.reduce(function(a, b){
					if(a.pts>0 && b.pts>0){
						return a.pts + b.pts;
					}
                
				})
			}else{
				var r = bps[0].pts;
			}
			
		
		$("#totalPoints").text("Total points: " + r);
		var vpname = "Blueprint name";
		var nop = "Number of points";
		var ac  = "Action";
		$("#tabla tbody").empty();
		var temp = null;
		var markup = null;
		mapped.map(function(bp){
			
			if(temp == null){
				markup = '<tr><th>'+vpname+'</th><th>'+nop+'</th><th>'+ac+'</th></tr><tr><th>'+bp.name+'</th><th>'+bp.pts+'</th><th type="button" onclick="app.draw(\''+bp.name+'\')">Open</th></tr>';
				temp = "a";
			}else{
				markup = '<tr><th>'+bp.name+'</th><th>'+bp.pts+'</th><th type="button" onclick="app.draw(\''+bp.name+'\')">Open</th></tr>';
			}
			$("table > tbody").append(markup);
		});
		}
		
	}
	var queue = function(author){
		//alert("hereim");
		at = author;
		mock.getBlueprintsByAuthor(at, table);
	}
	
	
	var drawCanvas = function(blueprint){

			currentBp = blueprint;
			var c = document.getElementById("myCanvas");
			document.getElementById("bpna").textContent="Current blueprint: "+currentBp.name;
			var ctx = c.getContext("2d");
			var dx = null;
			var dy = null;
			ctx.clearRect(0, 0, 500, 300);
			ctx.beginPath();
			blueprint.points.map(function(point){
				if(dx == null){
					dx = point.x;
					dy = point.y;
					ctx.moveTo(dx, dy);
				}else{
					ctx.lineTo(point.x, point.y);
				}
			});
			ctx.stroke();
	}
	var compensar = function(obj) {
		
          var offsetLeft = 0;
          var offsetTop = 0;
          do {
            if (!isNaN(obj.offsetLeft)) {
                offsetLeft += obj.offsetLeft;
            }
            if (!isNaN(obj.offsetTop)) {
                offsetTop += obj.offsetTop;
            }   
          } while(obj = obj.offsetParent );
          return {left: offsetLeft, top: offsetTop};
    }
	
	var pointerHandler = function(event){
		var nuevo = 
			{
				x: event.pageX-offset.left,
				y: event.pageY-offset.top
			}
		
		currentBp.points.push(nuevo);
		drawCanvas(currentBp);
		
	}
	
	var pointerInit = function(){
		var canvas = document.getElementById("myCanvas");
		offset = compensar(canvas);
		canvas.addEventListener("pointerdown", pointerHandler, false);
		
	}
	
	var addnew = function(){
		var canvas = document.getElementById("myCanvas");
		var ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, 500, 300);
		ctx.beginPath();
		queue(at);
	}
	
	var reload = function(){
		currentBp = null;
		queue(at);
	}
	
	return{
		queue : queue,
		draw : function(name){
			//author = document.getElementById("authorInput").value;
			mock.getBlueprintsByNameAndAuthor(name,at,drawCanvas);
		},
		pointerInit : pointerInit,
		put : function(){
			mock.put(currentBp, queue);
		},
		createNewBlueprint : function(){
			if(at != null){
				var na = prompt("Type the blueprint name");
				mock.create(at,na, addnew);
			}else{
				alert("No author specified");
			}
			
		},
		deleteBp : function(){
			if(currentBp!= null){
				mock.deletebp(currentBp, queue);
			}else{
				alert("No blueprint specified");
			}
			
		}
	};
	
})();