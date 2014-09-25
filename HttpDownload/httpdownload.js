/*usage args
	http://www.iabc.com/movie/photogallery/def3/images/
	xyz
	1
	77
*/

if (process.argv.length < 6){
	console.log ('Invalid number of params');
	console.log('Usage: baseUrl subString start end')
	return;
}

var startUrl = process.argv[2];
var subString = process.argv[3];
var start =process.argv[4];;
var end=process.argv[5];;


var fs = require('fs');
var http = require('http');


for (var i=start;i<=end;i++){
	var fileName = subString + i.toString() + '.jpg';
	var url = startUrl + fileName;
	console.log(url);

	http.get(url, function(response){

		console.log (response.req.path);
		var tokens = response.req.path.split('/');
		console.log (tokens);
		console.log (tokens.length);
		console.log (tokens[tokens.length-1]);
		var ff = tokens[tokens.length-1];

		var bl = require('bl');
		response.pipe(bl(function(err, data){
			var wr = fs.createWriteStream(ff);
			wr.write(data);
			wr.end();			
		}));

	}).on('error', function(err){
		console.log (err);
	});
	
}