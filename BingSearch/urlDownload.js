module.exports = function(url, folder, callback){
	var http = require('http');
	
	http.get(url, function(response){
		//console.log (response.req.path);
		var tokens = response.req.path.split('/');
		//console.log (tokens);
		//console.log (tokens.length);
		console.log (tokens[tokens.length-1]);
		var filePath = folder + '\\' + tokens[tokens.length-1];

		var bl = require('bl');
		response.pipe(bl(function(err, data){
			if (err){
				callback ('Error writing to file ' + filePath + ":" + err);
			}
			var fs = require('fs');
			var wr = fs.createWriteStream(filePath).on('error', function(err){
				callback ('Error creating file ' + filePath + ":" + err);		
			});
			wr.write(data);
			wr.end();
			callback('Successfully added ' + url + ':file:' + filePath);
		})).on('error', function(err){
			callback ('Error in pipe ' + filePath + ":" + err);	
		});

	}).on('error', function(err){
		callback ('Error getting url ' + url + ":" + err);
	});
}