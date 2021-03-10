var apiclient = (function(){
	
	return{
		getBlueprintsByAuthor : function(author, callback){
			$.get("http://localhost:8080/blueprints/"+author, function(answ){
				callback(answ);
			});
		},
		getBlueprintsByNameAndAuthor : function(name,author,callback){
			$.get("http://localhost:8080/blueprints/"+author+"/"+name, function(answ){
				callback(answ);
			});
		},
		put: function(n, callback){
			var bp = JSON.stringify(n);
			var promise = 
			$.ajax({
			url: "http://localhost:8080/blueprints/"+n.author+"/"+n.name,
			type: 'PUT',
			data: bp,
			contentType: "application/json"
			});
			promise.then(callback(n.author));
			//callback(n.author);
			
		}
	}
	
})();