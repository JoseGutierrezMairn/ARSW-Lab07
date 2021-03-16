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
			const promise = new Promise((resolve, reject) => {
			$.ajax({
			url: "http://localhost:8080/blueprints/"+n.author+"/"+n.name,
			type: 'PUT',
			data: bp,
			contentType: "application/json"
			}).done(function () {
                    resolve('SUCCESS');

                }).fail(function (msg) {
                    reject('FAIL');
                });
			});
			promise.then(function(){
				callback(n.author)
			});
			
			//callback(n.author);
			
		},
		create : function(author, n, callback){
				var nueva = {
					author: author,
					name: n,
					points: []
				}
				this.put(nueva, callback);
		},
		
		deletebp : function(n, callback){
			console.log(n);
			var bp = JSON.stringify(n);
			console.log(n.name);
			console.log(n.author);
			const promise = new Promise((resolve, reject) => {
			$.ajax({
			url: "http://localhost:8080/blueprints/"+n.author+"/"+n.name,
			type: 'DELETE',
			data: bp,
			contentType: "application/json"
			}).done(function () {
                    resolve('SUCCESS');

                }).fail(function (msg) {
                    reject('FAIL');
                });
			});
			$.get("http://localhost:8080/blueprints/"+bp.author, function(answ){
				console.log(answ);
			});
			promise.then(function(){
				callback(n.author)
			});
			
		}
	}
	
})();