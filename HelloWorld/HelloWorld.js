console.log ("Hello World");

console.log (process.argv);

for (var j=0;j<process.argv.length;j++){
	console.log (process.argv[j]);
}


var fs = require('fs');
var buf = fs.readFileSync('HelloWorld.js');
//console.log (buf.toString());

fs.readFile('HelloWorld.js',function(err, buffer){
	if (err){
		console.log(err.toString());
	}
	else{
		//console.log(buffer.toString());
	};
});

var mm = require('./mathModule');
mm(2,3, function(err, value){
	if (err){
		console.log ("Math Error:" + err);
	}
	else{
		console.log (value);
	};
});

var data1='';
var data2='';

//http get
var url='http://www.idlebrain.com/movie/photogallery/anushka108/index.html';
var http = require('http');
http.get(url, function(response){
		response.on('data', function(data){
			//console.log ('Reponse data:' + data);
			data1= data1 + data;
			console.log ('Reponse data');
		});
		response.on('end', function(data){
			console.log ('#######end######');
			console.log (data1 === data2.toString());
		});
	}).on('error', function(error){
		console.log ('Reponse error:' + error);
	});

var bl = require('bl');
http.get(url, function(response){
	response.pipe(bl(function(err, data){
		if (err){
			console.log("bl error:" + err);
		}
		else{
			data2= data;
			console.log ("Data");
			console.log (data1 === data2.toString());
		};
	}));
});


var url2='http://www.idlebrain.com/movie/photogallery/ileana87/index.html';
var url3='http://www.idlebrain.com/movie/photogallery/charmme97/index.html';

var data11 = null;
var data22 = null;
var data3 = null;

http.get(url, function(response){
	var bl = require('bl');
	response.pipe(bl(function(err, data){
		if (data22 && data3){
			console.log ('data11');
			console.log ('all done');
		}
		else{
			data11=data;
			console.log ('data11');
		};
	}));
});

http.get(url2, function(response){
	var bl = require('bl');
	response.pipe(bl(function(err, data){
		if (data11 && data3){
			console.log ('data22');
			console.log ('all done');
		}
		else{
			data22=data;
			console.log ('data22');
		};
	}));
});

http.get(url3, function(response){
	var bl = require('bl');
	response.pipe(bl(function(err, data){
		if (data22 && data11){
			console.log ('data3');
			console.log ('all done');
		}
		else{
			data3=data;
			console.log ('data3');
		};
	}));
});